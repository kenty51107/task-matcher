package datastore

import (
	"errors"
	"time"

	"github.com/kenty51107/task-matcher/internal/app/domain/model"
	"github.com/kenty51107/task-matcher/internal/app/usecase/repository"
	"gorm.io/gorm"
)

type userDatastore struct {
    DB *gorm.DB
}

func NewUserDatastore(DB *gorm.DB) repository.IUserRepository {
    return &userDatastore{DB}
}

func (ud *userDatastore) FindUserByID(userID int) (*model.User, error) {
    row := &model.User{ID: userID}
    if err := ud.DB.First(row).Error; err != nil {
        return nil, err
    }
    return row, nil
}

func (ud *userDatastore) FindUsers() ([]*model.User, error) {
    rows  := []*model.User{}
    if err := ud.DB.Find(&rows).Error; err != nil {
        return nil, err
    }
    return rows, nil
}

func (ud *userDatastore) CreateUser(input *model.CreateUserInput) (*model.User, error) {
    timestamp := time.Now()
    row := &model.User{
        Name: *input.Name,
        Email: *input.Email,
        Password: *input.Password,
        CreatedAt: timestamp,
        UpdatedAt: timestamp,
    }
    if err := ud.DB.Create(row).Error; err != nil {
        return nil, err
    }
    return row, nil
}

func (ud *userDatastore) UpdateUser(input *model.UpdateUserInput) (*model.User, error) {
    row := &model.User{}
    if err := ud.DB.Where("id = ?", input.ID).First(row).Error; err != nil {
        return nil, err
    }
    if input.Name != nil {
        row.Name = *input.Name
    }
    if input.Email != nil {
        row.Email = *input.Email
    }
    if input.Password != nil {
        row.Password = *input.Password
    }
    row.UpdatedAt = time.Now()
    if err := ud.DB.Save(row).Error; err != nil {
        return nil, err
    }
    return row, nil
}

func (ud *userDatastore) DeleteUser(input *model.DeleteUserInput) error {
    row := ud.DB.Where("id = ?", input.ID).Delete(&model.User{})
    if row.Error != nil {
        return row.Error
    }
    if row.RowsAffected < 1 {
        return errors.New("no user records found")
    }
    return nil
}
