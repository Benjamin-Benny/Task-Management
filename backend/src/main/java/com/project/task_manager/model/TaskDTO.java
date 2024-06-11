package com.project.task_manager.model;

import lombok.Data;

import java.util.Date;

@Data
// TaskDTO.java
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private Date dueDate;
    private boolean completed;

    // Constructors, getters, and setters
}
