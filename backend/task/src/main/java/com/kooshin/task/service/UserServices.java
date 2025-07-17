package com.kooshin.task.service;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.kooshin.task.entity.User;
import com.kooshin.task.entity.UserRole;
import com.kooshin.task.repository.UserRepo;

@Service
public class UserServices {

    private final UserRepo userRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServices(UserRepo userRepo, BCryptPasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    public User createUser(User user) {
        if (user.getRole() == null) {
            user.setRole(UserRole.USER);
        }
        if (user.getPhoto() == null || user.getPhoto().isEmpty()) {
            user.setPhoto("default.png");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword())); // encode password on signup
        return userRepo.save(user);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User getUserById(Integer userId) {
        return userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }

    public User updateUser(Integer userId, User userDetails) {
        return userRepo.findById(userId).map(user -> {
            user.setFullname(userDetails.getFullname());
            user.setEmail(userDetails.getEmail());

            if (userDetails.getPassword() != null && !userDetails.getPassword().isBlank()) {
                user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            }

            if (userDetails.getRole() != null) {
                user.setRole(userDetails.getRole());
            }

            if (userDetails.getPhoto() != null && !userDetails.getPhoto().isEmpty()) {
                user.setPhoto(userDetails.getPhoto());
            }

            return userRepo.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }

    public void deleteUser(Integer userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        userRepo.delete(user);
    }
}
