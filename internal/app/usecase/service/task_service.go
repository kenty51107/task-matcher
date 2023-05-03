package service

import (
	"github.com/kenty51107/task-matcher/internal/app/domain/model"
	"github.com/kenty51107/task-matcher/internal/app/domain/service"
	"github.com/kenty51107/task-matcher/internal/app/usecase/repository"
)

type taskService struct {
    tr repository.ITaskRepository
}

func NewTaskService(tr repository.ITaskRepository) service.ITaskService {
    return &taskService{tr}
}

func (ts *taskService) FindTaskByID(taskId int) (*model.Task, error) {
    row, err := ts.tr.FindTaskByID(taskId)
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
    row, err := ts.tr.CreateTask(input)
    if err != nil {
        return nil, err
    }
    return row, nil
}

func (ts *taskService) UpdateTask(input *model.UpdateTaskInput) (*model.Task, error) {
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
