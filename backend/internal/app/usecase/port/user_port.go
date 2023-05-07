package port

import (
	"github.com/kenty51107/task-matcher/internal/app/domain/model"
	"github.com/kenty51107/task-matcher/internal/app/domain/service"
)

type userPort struct {
    ts service.IUserService
}

type IUserPort interface {
    FindUserByID(userID int) (*model.User, error)
    FindUsers() ([]*model.User, error)
    FindUserByEmail(email string) (*model.User, error)
    CreateUser(*model.CreateUserInput) (*model.User, error)
    UpdateUser(*model.UpdateUserInput) (*model.User, error)
    DeleteUser(*model.DeleteUserInput) error
}

func NewUserPort(ts service.IUserService) IUserPort {
    return &userPort{ts}
}

func (tp *userPort) FindUserByID(userID int) (*model.User, error) {
    return tp.ts.FindUserByID(userID)
}

func (tp *userPort) FindUsers() ([]*model.User, error) {
    return tp.ts.FindUsers()
}

func (tp *userPort) FindUserByEmail(email string) (*model.User, error) {
    return tp.ts.FindUserByEmail(email)
}


func (tp *userPort) CreateUser(input *model.CreateUserInput) (*model.User, error) {
    return tp.ts.CreateUser(input)
}

func (tp *userPort) UpdateUser(input *model.UpdateUserInput) (*model.User, error) {
    return tp.ts.UpdateUser(input)
}

func (tp *userPort) DeleteUser(input *model.DeleteUserInput) error {
    return tp.ts.DeleteUser(input)
}
