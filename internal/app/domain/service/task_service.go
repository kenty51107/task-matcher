package service

import "github.com/kenty51107/task-matcher/internal/app/domain/model"

type ITaskService interface {
    FindTaskByID(taskID int) (*model.Task, error)
    FindTasks() ([]*model.Task, error)
    CreateTask(*model.CreateTaskInput) (*model.Task, error)
    UpdateTask(*model.UpdateTaskInput) (*model.Task, error)
    DeleteTask(*model.DeleteTaskInput) error
}
