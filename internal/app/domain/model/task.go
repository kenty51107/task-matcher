package model

import (
	"fmt"
	"time"

	"github.com/go-playground/validator/v10"
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
	Title    string    `json:"title"`
	Content  string    `json:"content"`
	Schedule time.Time `json:"schedule"`
}

type DeleteTaskInput struct {
	ID string `json:"id"`
}

type UpdateTaskInput struct {
	ID       string     `json:"id"`
	Title    *string    `json:"title,omitempty"`
	Content  *string    `json:"content,omitempty"`
	Schedule *time.Time `json:"schedule,omitempty"`
	Done     *bool      `json:"done,omitempty"`
}

func (input *CreateTaskInput) CreateValidator() error {
	validator := validator.New()
	if err := validator.Var(input.Title, "required,max=100"); err != nil {
		return fmt.Errorf("タイトルを100文字以内で入力してください")
	}
	if err := validator.Var(input.Content, "required,max=300"); err != nil {
		return fmt.Errorf("内容を300文字以内で入力してください")
	}
	if err := validator.Var(input.Schedule, "required"); err != nil {
		return fmt.Errorf("日付を入力してください")
	}
	return nil
}

func (input *UpdateTaskInput) UpdateValidator() error {
	validator := validator.New()
	if err := validator.Var(input.Title, "max=100"); err != nil {
		return fmt.Errorf("タイトルは100文字以内で入力してください")
	}
	if err := validator.Var(input.Content, "max=300"); err != nil {
		return fmt.Errorf("内容は300文字以内で入力してください")
	}
	return nil
}

func (input *DeleteTaskInput) DeleteValidator() error {
	validator := validator.New()
	if err := validator.Var(input.ID, "required"); err != nil {
		return fmt.Errorf("IDを入力してください")
	}
	return nil
}
