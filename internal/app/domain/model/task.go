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
