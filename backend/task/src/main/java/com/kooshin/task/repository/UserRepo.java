package com.kooshin.task.repository;

import com.kooshin.task.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepo extends JpaRepository<User, Integer> {

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.tasks WHERE u.id = :id")
    Optional<User> findByIdWithTasks(@Param("id") Integer id);

    @Query("SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.tasks")
    List<User> findAllWithTasks();
}
