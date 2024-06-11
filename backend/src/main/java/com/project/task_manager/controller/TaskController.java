package com.project.task_manager.controller;

import com.project.task_manager.config.JwtUtil;
import com.project.task_manager.model.Task;
import com.project.task_manager.model.TaskDTO;
import com.project.task_manager.model.User;
import com.project.task_manager.service.TaskService;
import com.project.task_manager.service.UserNotFoundException;
import com.project.task_manager.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<?> getTasks(HttpServletRequest request) {
        try {
            Long userId = getUserIdFromToken(request);
            List<Task> tasks = taskService.findByUserId(userId);
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching tasks: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTask(@PathVariable Long id) {
        try {
            Task task = taskService.findById(id);
            if (task == null) {
                return ResponseEntity.notFound().build();
            }
            TaskDTO taskDTO = convertToDTO(task);
            return ResponseEntity.ok(taskDTO);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching task: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> addTask(@RequestBody Task task, HttpServletRequest request) {
        try {
            Long userId = getUserIdFromToken(request);
            User user = userService.findById(userId);
            task.setUser(user);
            Task newTask = taskService.save(task);
            return ResponseEntity.ok(newTask);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding task: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        try {
            Task task = taskService.findById(id);
            if (task == null) {
                return ResponseEntity.notFound().build();
            }
            task.setTitle(taskDetails.getTitle());
            task.setDescription(taskDetails.getDescription());
            task.setDueDate(taskDetails.getDueDate());
            task.setCompleted(taskDetails.isCompleted());
            Task updatedTask = taskService.save(task);
            return ResponseEntity.ok(updatedTask);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating task: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        try {
            Task task = taskService.findById(id);
            if (task == null || task.getUser() == null) {
                return ResponseEntity.notFound().build();
            }
            taskService.delete(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting task: " + e.getMessage());
        }
    }

    private Long getUserIdFromToken(HttpServletRequest request) {
        try {
            String authorizationHeader = request.getHeader("Authorization");
            String jwt = null;
            Long userId = null;

            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                jwt = authorizationHeader.substring(7);
                userId = jwtUtil.extractUserId(jwt); // Implement this method in your JwtUtil class
            }

            if (userId == null) {
                throw new UserNotFoundException("No user with that details");
            }
            return userId;
        } catch (Exception e) {
            throw new UserNotFoundException("Error extracting user ID from token: " + e.getMessage());
        }
    }

    private TaskDTO convertToDTO(Task task) {
        TaskDTO taskDTO = new TaskDTO();
        taskDTO.setId(task.getId());
        taskDTO.setTitle(task.getTitle());
        taskDTO.setDescription(task.getDescription());
        taskDTO.setDueDate(task.getDueDate());
        taskDTO.setCompleted(task.isCompleted());
        return taskDTO;
    }
}
