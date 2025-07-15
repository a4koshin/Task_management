package com.kooshin.task;

import java.util.*;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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
        if (user.getPhoto() == null) {
            user.setPhoto("default.png");
        }

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return userRepo.save(user);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User getUserById(Integer userId) {
        return userRepo.findById(userId).orElse(null);
    }

    public User updateUser(Integer userId, User userDetails) {
        User user = userRepo.findById(userId).orElse(null);
        if (user != null) {
            user.setFullname(userDetails.getFullname());
            user.setEmail(userDetails.getEmail());

            if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            }

            user.setRole(userDetails.getRole());
            user.setPhoto(userDetails.getPhoto());
            return userRepo.save(user);
        }
        return null;
    }

    public void deleteUser(Integer userId) {
        User user = userRepo.findById(userId).orElse(null);
        if (user != null) {
            userRepo.delete(user);
        }
    }
}
