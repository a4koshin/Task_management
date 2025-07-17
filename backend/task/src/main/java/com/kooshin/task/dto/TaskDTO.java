package com.kooshin.task.dto;

import java.time.LocalDate;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class TaskDTO {
    private Integer taskId;
    private String title;
    private String description;
    private String status;
    private LocalDate dueDate;
    private LocalDate createdAt;
    private LocalDate updatedAt;

    // Getters and setters
}
