package model

import (
	"time"
)

type Task struct {
    ID int `json:"id"`
    Title string `json:"title"`
    Content string `json:"content"`
    Schedule time.Time `json:"schedule"`
    Done bool `json:"done"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}

type CreateTaskInput struct {
	Title    *string    `json:"title,omitempty" validate:"required,max=100"`
	Content  *string    `json:"content,omitempty" validate:"required,max=300"`
	Schedule *time.Time `json:"schedule,omitempty" validate:"required"`
}

type DeleteTaskInput struct {
	ID *string `json:"id,omitempty" validate:"required"`
}

type UpdateTaskInput struct {
	ID       *string    `json:"id,omitempty" validate:"required"`
	Title    *string    `json:"title,omitempty" validate:"max=100"`
	Content  *string    `json:"content,omitempty" validate:"max=300"`
	Schedule *time.Time `json:"schedule,omitempty"`
	Done     *bool      `json:"done,omitempty"`
}
