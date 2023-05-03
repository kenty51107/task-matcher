package model

import "time"

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
	Done     bool      `json:"done"`
}

type UpdateTaskInput struct {
	ID       string     `json:"id"`
	Title    *string    `json:"title,omitempty"`
	Content  *string    `json:"content,omitempty"`
	Schedule *time.Time `json:"schedule,omitempty"`
	Done     *bool      `json:"done,omitempty"`
}
