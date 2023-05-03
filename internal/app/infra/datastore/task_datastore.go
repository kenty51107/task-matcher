package datastore

import (
	"fmt"
	"time"

	"github.com/kenty51107/task-matcher/internal/app/domain/model"
	"github.com/kenty51107/task-matcher/internal/app/usecase/repository"
	"gorm.io/gorm"
)

type taskDatastore struct {
    DB *gorm.DB
}

func NewTaskDatastore(DB *gorm.DB) repository.ITaskRepository {
    return &taskDatastore{DB}
}

func (td *taskDatastore) FindTaskByID(taskId int) (*model.Task, error) {
    row := &model.Task{ID: taskId}
    if err := td.DB.First(row).Error; err != nil {
        return nil, err
    }
    return row, nil
}

func (td *taskDatastore) FindTasks() ([]*model.Task, error) {
    rows  := []*model.Task{}
    if err := td.DB.Find(&rows).Error; err != nil {
        return nil, err
    }
    return rows, nil
}

func (td *taskDatastore) CreateTask(input *model.CreateTaskInput) (*model.Task, error) {
    row := &model.Task{
        Title: input.Title,
        Content: input.Content,
        Schedule: input.Schedule,
        Done: input.Done,
        CreatedAt: time.Now(),
        UpdatedAt: time.Now(),
    }

    if err := td.DB.Create(row).Error; err != nil {
        return nil, err
    }
    return row, nil
}

func (td *taskDatastore) UpdateTask(input *model.UpdateTaskInput) (*model.Task, error) {
    row := &model.Task{}
    if err := td.DB.Where("id = ?", input.ID).First(row).Error; err != nil {
        return nil, err
    }
    if input.Title != nil {
        row.Title = *input.Title
    }
    if input.Content != nil {
        row.Content = *input.Content
    }
    if input.Schedule != nil {
        row.Schedule = *input.Schedule
    }
    if input.Done != nil {
        row.Done = *input.Done
    }
    row.UpdatedAt = time.Now()

    return row, nil
}

func (td *taskDatastore) DeleteTask(input *model.DeleteTaskInput) (*model.Task, error) {
    row := td.DB.Where("id = ?", input.ID).Delete(&model.Task{})
    if row.Error != nil {
        return nil, row.Error
    }
    if row.RowsAffected < 1 {
        return nil, fmt.Errorf("no task records found")
    }
    return nil, nil
}
