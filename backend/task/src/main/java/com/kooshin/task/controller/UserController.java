package com.kooshin.task.controller;

import com.kooshin.task.dto.UserDTO;
import com.kooshin.task.entity.User;
import com.kooshin.task.dto.DTOMapper;
import com.kooshin.task.service.UserServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class UserController {

    private final UserServices userServices;

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        if (userServices.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already registered");
        }

        User savedUser = userServices.createUser(user);
        return ResponseEntity.status(201).body(DTOMapper.toUserDTO(savedUser));
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userServices.getAllUsers()
                .stream()
                .map(DTOMapper::toUserDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Integer userId) {
        User user = userServices.getUserById(userId);
        return ResponseEntity.ok(DTOMapper.toUserDTO(user));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Integer userId, @RequestBody User userDetails) {
        User updatedUser = userServices.updateUser(userId, userDetails);
        return ResponseEntity.ok(DTOMapper.toUserDTO(updatedUser));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer userId) {
        userServices.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }
}
