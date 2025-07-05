package com.kooshin.task;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter  

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String fullname;

    @Column(nullable = false, length = 100, unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role;
    
    private String photo;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

   
}