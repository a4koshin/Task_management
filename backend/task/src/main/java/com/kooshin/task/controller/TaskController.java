package com.kooshin.task.controller;

import com.kooshin.task.dto.TaskDTO;
import com.kooshin.task.entity.Task;
import com.kooshin.task.entity.User;
import com.kooshin.task.dto.DTOMapper;
import com.kooshin.task.repository.UserRepo;
import com.kooshin.task.service.TaskServices;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private final TaskServices taskServices;
    private final UserRepo userRepo;

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        List<TaskDTO> tasks = taskServices.getAllTask()
                .stream()
                .map(DTOMapper::toTaskDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        task.setUser(user);
        taskServices.createTask(task);

        return ResponseEntity.status(201).body("Task created successfully");
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<?> updateTask(@PathVariable Integer taskId, @RequestBody Task taskDetails) {
        taskServices.updateTask(taskId, taskDetails);
        return ResponseEntity.ok("Task updated successfully");
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Integer taskId) {
        taskServices.deleteTask(taskId);
        return ResponseEntity.ok("Task deleted successfully");
    }
}
