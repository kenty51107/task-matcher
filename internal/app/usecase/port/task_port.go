package port

import (
	"github.com/kenty51107/task-matcher/internal/app/domain/model"
	"github.com/kenty51107/task-matcher/internal/app/domain/service"
)

type taskPort struct {
    ts service.ITaskService
}

type ITaskPort interface {
    FindTaskByID(taskID int) (*model.Task, error)
    FindTasks() ([]*model.Task, error)
    CreateTask(*model.CreateTaskInput) (*model.Task, error)
    UpdateTask(*model.UpdateTaskInput) (*model.Task, error)
    DeleteTask(*model.DeleteTaskInput) error
}

func NewTaskPort(ts service.ITaskService) ITaskPort {
    return &taskPort{ts}
}

func (tp *taskPort) FindTaskByID(taskID int) (*model.Task, error) {
    return tp.ts.FindTaskByID(taskID)
}

func (tp *taskPort) FindTasks() ([]*model.Task, error) {
    return tp.ts.FindTasks()
}

func (tp *taskPort) CreateTask(input *model.CreateTaskInput) (*model.Task, error) {
    return tp.ts.CreateTask(input)
}

func (tp *taskPort) UpdateTask(input *model.UpdateTaskInput) (*model.Task, error) {
    return tp.ts.UpdateTask(input)
}

func (tp *taskPort) DeleteTask(input *model.DeleteTaskInput) error {
    return tp.ts.DeleteTask(input)
}
