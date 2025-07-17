package com.kooshin.task.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kooshin.task.entity.Task;

public interface TaskRepo extends JpaRepository<Task, Integer> {
}
