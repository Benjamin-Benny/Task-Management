package com.project.task_manager.controller;

import com.project.task_manager.model.Task;
import com.project.task_manager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getTasks(@AuthenticationPrincipal User user) {
        return taskService.findByUserId(user.getId());
    }

    @PostMapping
    public Task addTask(@RequestBody Task task, @AuthenticationPrincipal User user) {
        task.setUser(user);
        return taskService.save(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails, @AuthenticationPrincipal User user) {
        Task task = taskService.findById(id);
        if (task.getUser().equals(user))