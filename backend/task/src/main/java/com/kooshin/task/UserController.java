package com.kooshin.task;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173/")
public class UserController {

    private final UserServices userServices;

    public UserController(UserServices userServices) {
        this.userServices = userServices;
    }


    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            // Check if email already exists
            if (userServices.existsByEmail(user.getEmail())) {
                return ResponseEntity
                        .badRequest()
                        .body("Error: Email is already registered");
            }

            // Save the user
            User savedUser = userServices.createUser(user);
            return ResponseEntity
                    .status(201) 
                    .body(savedUser);

        } catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body("Signup failed: " + e.getMessage());
        }
    }

  
    @GetMapping
    public List<User> getAllUsers() {
        return userServices.getAllUsers();
    }

   
    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Integer userId) {
        return userServices.getUserById(userId);
    }

    @PutMapping("/{userId}")
    public User updateUser(@PathVariable Integer userId, @RequestBody User userDetails) {
        return userServices.updateUser(userId, userDetails);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Integer userId) {
        userServices.deleteUser(userId);
    }
}
