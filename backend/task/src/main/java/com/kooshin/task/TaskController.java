package com.kooshin.task;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskServices taskServices;

    public TaskController(TaskServices taskSer){
        this.taskServices = taskSer;
    }


    // Get All Tasks
    @GetMapping
    public List<Task> getAllTasks(){
        return taskServices.getAllTask();
    }

    //create task
    @PostMapping
    public void createTask(@RequestBody Task task){
        taskServices.createTask(task);
    }
    //Update Task
    @PutMapping("/{taskId}")
    public void updateTask(@PathVariable Integer taskId, @RequestBody Task taskDetails){
        Task tsk = new Task();
        tsk.setTitle(taskDetails.getTitle());
        tsk.setDescription(taskDetails.getDescription());
        tsk.setStatus(taskDetails.getStatus());
        tsk.setDueTime(taskDetails.getDueTime());
        tsk.setUpdatedAt(taskDetails.getUpdatedAt());
        tsk.setTaskId(taskId);
        taskServices.updateTask(tsk, taskDetails);
    }

    // Delete Task

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Integer taskId){
        taskServices.deleteTask(taskId);

}

}