package com.kooshin.task.dto;

import java.time.LocalDate;
import java.util.List;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
    private Integer id;
    private String fullname;
    private String email;
    private String photo;
    private String role;
    private LocalDate createdAt;
    private List<TaskDTO> tasks;

    // Getters and setters
}
