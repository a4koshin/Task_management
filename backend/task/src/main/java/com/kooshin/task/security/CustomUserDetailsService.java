package com.kooshin.task.security;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import com.kooshin.task.entity.User;
import com.kooshin.task.repository.UserRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepo userRepo;

    public CustomUserDetailsService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().name()) // automatically prepends "ROLE_"
                .build();
    }
}
