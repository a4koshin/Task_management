package com.kooshin.task;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TaskServices {
    private final TaskRepo taskRepo;

    public TaskServices(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }

    // Get All Tasks
    public List<Task> getAllTask() {
        return taskRepo.findAll();
    }

    // Create Task
    public void createTask(Task task) {
        taskRepo.save(task);
    }

    // Update Task
    public void updateTask(Task taskId, Task taskDetails) {
        Task task = taskRepo.findById(taskId.getTaskId()).orElseThrow(null);

        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setStatus(taskDetails.getStatus());
        task.setDueTime(taskDetails.getDueTime());
        task.setUpdatedAt(taskDetails.getUpdatedAt());

        taskRepo.save(task);
    }

    // Delete Task

    public void deleteTask(Integer taskId) {
        Task task = taskRepo.findById(taskId).orElseThrow(null);
        taskRepo.delete(task);
    }

}