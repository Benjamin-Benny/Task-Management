package com.project.task_manager.service;

import com.project.task_manager.model.Task;
import com.project.task_manager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> findByUserId(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    public Task save(Task task) {
        return taskRepository.save(task);
    }

    public void delete(Long id) {
        taskRepository.deleteById(id);
    }

    public Task findById(Long id) {
        return taskRepository.getReferenceById(id);
    }
}
