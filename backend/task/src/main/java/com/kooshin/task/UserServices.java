package com.kooshin.task;

import java.util.*;

import org.springframework.stereotype.Service;

@Service
public class UserServices {
    private final UserRepo userRepo;
    public UserServices(UserRepo userRepo) {
        this.userRepo = userRepo;
    }
public boolean existsByEmail(String email) {
    return userRepo.existsByEmail(email);
}

    // Method to create a new user
    public User createUser(User user){
        if (user.getRole() == null) {
            user.setRole(UserRole.USER);
        }
        if (user.getPhoto() == null) {
            user.setPhoto("default.png");
        }
        return userRepo.save(user);
    }

    // Method to get a All user

    public List<User> getAllUsers(){return userRepo.findAll();}

    // Method to get a user by ID
    public User getUserById(Integer userId){
        return userRepo.findById(userId).orElse(null);
    }


    // Method to update a user
    public User updateUser(Integer userId, User userDetails){
    User user = userRepo.findById(userId).orElse(null);
    if (user != null) {
        user.setFullname(userDetails.getFullname());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        user.setRole(userDetails.getRole());
        user.setPhoto(userDetails.getPhoto());
        return userRepo.save(user);
    }
    return null;
}




    // Method to delete a user
    public void deleteUser(Integer userId){
        User user = userRepo.findById(userId).orElse(null);
        if (user != null) {
            userRepo.delete(user);
        }

        
    }
}
