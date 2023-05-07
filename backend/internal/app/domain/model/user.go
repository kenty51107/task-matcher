package model

import (
	"time"
)

type User struct {
	ID int `json:"id"`
	Name string `json:"name"`
	Email string `json:"email"`
	Password string `json:"password"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type CreateUserInput struct {
	Name     *string `json:"name,omitempty" validate:"required,max=100"`
	Email    *string `json:"email,omitempty" validate:"required,max=255"`
	Password *string `json:"password,omitempty" validate:"required,max=255"`
}

type DeleteUserInput struct {
	ID *string `json:"id,omitempty" validate:"required,max=255"`
}

type UpdateUserInput struct {
	ID       *string `json:"id,omitempty" validate:"required"`
	Name     *string `json:"name,omitempty" validate:"max=100"`
	Email    *string `json:"email,omitempty" validate:"max=255"`
	Password *string `json:"password,omitempty" validate:"max=255"`
}

// type User struct {
// 	ID        *string    `json:"id,omitempty"`
// 	Name      *string    `json:"name,omitempty"`
// 	Email     *string    `json:"email,omitempty"`
// 	Password  *string    `json:"password,omitempty"`
// 	CreatedAt *time.Time `json:"created_at,omitempty"`
// 	UpdatedAt *time.Time `json:"updated_at,omitempty"`
// }
