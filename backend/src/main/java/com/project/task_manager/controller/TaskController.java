package com.project.task_manager.controller;

import com.project.task_manager.config.JwtUtil;
import com.project.task_manager.model.Task;
import com.project.task_manager.model.TaskDTO;
import com.project.task_manager.model.User;
import com.project.task_manager.service.TaskService;
import com.project.task_manager.service.UserNotFoundException;
import com.project.task_manager.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.ws.rs.Path;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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
    public List<Task> getTasks(HttpServletRequest request)
    {
        Long userId = getUserIdFromToken(request);

        // Fetch tasks associated with the user
        return taskService.findByUserId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTask(@PathVariable Long id) {
        Task task = taskService.findById(id);
        TaskDTO taskDTO = convertToDTO(task);
        return ResponseEntity.ok().body(taskDTO);
    }

    @PostMapping
    public Task addTask(@RequestBody Task task, HttpServletRequest request) {

        Long userId = getUserIdFromToken(request);

        User user = userService.findById(userId);
        task.setUser(user);
        return taskService.save(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task task = taskService.findById(id);
            task.setTitle(taskDetails.getTitle());
            task.setDescription(taskDetails.getDescription());
            task.setDueDate(taskDetails.getDueDate());
            task.setCompleted(taskDetails.isCompleted());
            return taskService.save(task);
        
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        Task task = taskService.findById(id);
        if (task.getUser() != null) {
            taskService.delete(id);
            return ResponseEntity.ok().build();
        } else {
//            throw new UnauthorizedException();
            return ResponseEntity.notFound().build();
        }
    }

    public Long getUserIdFromToken(HttpServletRequest request){
        String authorizationHeader = request.getHeader("Authorization");
        String jwt = null;
        Long userId = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            // Extract user information (e.g., user ID) from the token
            userId = jwtUtil.extractUserId(jwt); // Implement this method in your JwtUtil class
        }

        // Check if userId is null or invalid
        if (userId == null) {
            // Handle unauthorized access
            throw new UserNotFoundException("No user with that details");
        }
        return userId;
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

