package service

import "github.com/kenty51107/task-matcher/internal/app/domain/model"

type IUserService interface {
    FindUserByID(userID int) (*model.User, error)
    FindUsers() ([]*model.User, error)
    FindUserByEmail(email string) (*model.User, error)
    CreateUser(*model.CreateUserInput) (*model.User, error)
    UpdateUser(*model.UpdateUserInput) (*model.User, error)
    DeleteUser(*model.DeleteUserInput) error
}
