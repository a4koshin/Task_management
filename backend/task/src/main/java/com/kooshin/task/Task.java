package com.kooshin.task;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tasks")

public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer taskId;
    @Column(nullable = false, length = 100)
    private String title;
    private String description;
    
    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    private LocalDate dueTime;
    private LocalDate updatedAt;
    private LocalDate createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
