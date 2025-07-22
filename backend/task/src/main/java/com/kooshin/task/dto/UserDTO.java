package com.kooshin.task.dto;

import java.time.LocalDateTime;
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
    private LocalDateTime createdAt;
    private List<TaskDTO> tasks;

}
