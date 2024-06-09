package com.project.task_manager.controller;

import com.project.task_manager.model.Task;
import com.project.task_manager.model.User;
import com.project.task_manager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getTasks(@AuthenticationPrincipal User user) {
//        return taskService.findByUserId(user.getId());
                return taskService.findByUserId((long)1);
    }

    @PostMapping
    public Task addTask(@RequestBody Task task) {
//        task.setUser(user);
        return taskService.save(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task task = taskService.findById(id);
        if (true) {
            task.setTitle(taskDetails.getTitle());
            task.setDescription(taskDetails.getDescription());
            task.setDueDate(taskDetails.getDueDate());
            task.setCompleted(taskDetails.isCompleted());
            return taskService.save(task);
        } else {
//            throw new UnauthorizedException();
            return new Task();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, @AuthenticationPrincipal User user) {
        Task task = taskService.findById(id);
        if (task.getUser() != null) {
            taskService.delete(id);
            return ResponseEntity.ok().build();
        } else {
//            throw new UnauthorizedException();
            return ResponseEntity.notFound().build();
        }
    }
}