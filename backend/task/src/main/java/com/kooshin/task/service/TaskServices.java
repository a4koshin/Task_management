package com.kooshin.task.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kooshin.task.entity.Task;
import com.kooshin.task.repository.TaskRepo;

@Service
public class TaskServices {

    private final TaskRepo taskRepo;

    public TaskServices(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }

    public List<Task> getAllTask() {
        return taskRepo.findAll();
    }

    public Task createTask(Task task) {
        task.setCreatedAt(LocalDateTime.now());
        return taskRepo.save(task);
    }

    public Task updateTask(Integer taskId, Task taskDetails) {
        return taskRepo.findById(taskId).map(task -> {
            task.setTitle(taskDetails.getTitle());
            task.setDescription(taskDetails.getDescription());
            task.setStatus(taskDetails.getStatus());
            task.setDueDate(taskDetails.getDueDate());
            task.setUpdatedAt(LocalDateTime.now());
            return taskRepo.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
    }

    public void deleteTask(Integer taskId) {
        Task task = taskRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
        taskRepo.delete(task);
    }
}
