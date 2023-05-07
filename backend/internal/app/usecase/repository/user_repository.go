package repository

import "github.com/kenty51107/task-matcher/internal/app/domain/model"

type IUserRepository interface {
    FindUserByID(userID int) (*model.User, error)
    FindUsers() ([]*model.User, error)
    CreateUser(*model.CreateUserInput) (*model.User, error)
    UpdateUser(*model.UpdateUserInput) (*model.User, error)
    DeleteUser(*model.DeleteUserInput) error
}
