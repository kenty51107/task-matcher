package service

import (
	"errors"

	"github.com/kenty51107/task-matcher/internal/app/domain/model"
	"github.com/kenty51107/task-matcher/internal/app/domain/service"
	"github.com/kenty51107/task-matcher/internal/app/infra/validator"
	"github.com/kenty51107/task-matcher/internal/app/usecase/repository"
)

type IUserService interface {
    service.IUserService
    repository.IUserRepository
}

type userService struct {
    ur repository.IUserRepository
    tv validator.IUserValidator
}

func NewUserService(ur repository.IUserRepository, tv validator.IUserValidator) IUserService {
    return &userService{ur, tv}
}

func (us *userService) FindUserByID(userID int) (*model.User, error) {
    row, err := us.ur.FindUserByID(userID)
    if err != nil {
        return nil, err
    }
    return row, nil
}

func (us *userService) FindUsers() ([]*model.User, error) {
    rows, err := us.ur.FindUsers()
    if err != nil {
        return nil, err
    }
    return rows, nil
}

func (us *userService) FindUserByEmail(email string) (*model.User, error) {
    row, err := us.ur.FindUserByEmail(email)
    if err != nil {
        return nil, err
    }
    return row, nil
}

func (us *userService) CreateUser(input *model.CreateUserInput) (*model.User, error) {
    err := us.tv.Validate(input)
    if err != nil {
        validateError := us.tv.GetValidateError(err)
        return nil, errors.New(validateError)
    }
    row, err := us.ur.CreateUser(input)
    if err != nil {
        return nil, err
    }
    return row, nil
}

func (us *userService) UpdateUser(input *model.UpdateUserInput) (*model.User, error) {
    err := us.tv.Validate(input)
    if err != nil {
        validateError := us.tv.GetValidateError(err)
        return nil, errors.New(validateError)
    }
    row, err := us.ur.UpdateUser(input)
    if err != nil {
        return nil, err
    }
    return row, nil
}

func (us *userService) DeleteUser(input *model.DeleteUserInput) error {
    err := us.tv.Validate(input)
    if err != nil {
        validateError := us.tv.GetValidateError(err)
        return errors.New(validateError)
    }
    err = us.ur.DeleteUser(input)
    if err != nil {
        return err
    }
    return nil
}
