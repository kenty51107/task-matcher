package service

import (
	"github.com/kenty51107/task-matcher/internal/app/domain/model"
	"github.com/kenty51107/task-matcher/internal/app/domain/service"
	"github.com/kenty51107/task-matcher/internal/app/usecase/repository"
	"github.com/kenty51107/task-matcher/internal/app/usecase/validator"
)

type taskService struct {
    tr repository.ITaskRepository
    tv validator.ITaskValidator
}

func NewTaskService(tr repository.ITaskRepository, tv validator.ITaskValidator) service.ITaskService {
    return &taskService{tr, tv}
}

func (ts *taskService) FindTaskByID(taskID int) (*model.Task, error) {
    row, err := ts.tr.FindTaskByID(taskID)
    if err != nil {
        return nil, err
    }
    return row, nil
}

func (ts *taskService) FindTasks() ([]*model.Task, error) {
    rows, err := ts.tr.FindTasks()
    if err != nil {
        return nil, err
    }
    return rows, nil
}

func (ts *taskService) CreateTask(input *model.CreateTaskInput) (*model.Task, error) {
    if err := ts.tv.CreateTaskValidate(*input); err != nil {
        return nil, err
    }
    row, err := ts.tr.CreateTask(input)
    if err != nil {
        return nil, err
    }
    return row, nil
}

func (ts *taskService) UpdateTask(input *model.UpdateTaskInput) (*model.Task, error) {
    if err := ts.tv.UpdateTaskValidate(*input); err != nil {
        return nil, err
    }
    row, err := ts.tr.UpdateTask(input)
    if err != nil {
        return nil, err
    }
    return row, nil
}

func (ts *taskService) DeleteTask(input *model.DeleteTaskInput) error {
    err := ts.tr.DeleteTask(input)
    if err != nil {
        return err
    }
    return nil
}
