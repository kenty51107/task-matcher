package model

import (
	"fmt"
	"io"
	"strconv"
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

type TaskOrderInput struct {
	Field       TaskOrderField  `json:"field"`
	Orientation SortOrientation `json:"orientation"`
}

type SortOrientation string

const (
	SortOrientationAsc  SortOrientation = "ASC"
	SortOrientationDesc SortOrientation = "DESC"
)

var AllSortOrientation = []SortOrientation{
	SortOrientationAsc,
	SortOrientationDesc,
}

func (e SortOrientation) IsValid() bool {
	switch e {
	case SortOrientationAsc, SortOrientationDesc:
		return true
	}
	return false
}

func (e SortOrientation) String() string {
	return string(e)
}

func (e *SortOrientation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = SortOrientation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid SortOrientation", str)
	}
	return nil
}

func (e SortOrientation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type TaskOrderField string

const (
	TaskOrderFieldSchedule  TaskOrderField = "SCHEDULE"
	TaskOrderFieldCreatedAt TaskOrderField = "CREATED_AT"
)

var AllTaskOrderField = []TaskOrderField{
	TaskOrderFieldSchedule,
	TaskOrderFieldCreatedAt,
}

func (e TaskOrderField) IsValid() bool {
	switch e {
	case TaskOrderFieldSchedule, TaskOrderFieldCreatedAt:
		return true
	}
	return false
}

func (e TaskOrderField) String() string {
	return string(e)
}

func (e *TaskOrderField) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = TaskOrderField(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid TaskOrderField", str)
	}
	return nil
}

func (e TaskOrderField) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
