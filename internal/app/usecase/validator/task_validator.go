package validator

import (
	"errors"
	"time"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/kenty51107/task-matcher/internal/app/domain/model"
)
type ITaskValidator interface {
    CreateTaskValidate(task model.CreateTaskInput) error
    UpdateTaskValidate(task model.UpdateTaskInput) error
}

type taskValidator struct {}

func NewTaskValidator() ITaskValidator {
    return &taskValidator{}
}

func (tv *taskValidator) CreateTaskValidate(task model.CreateTaskInput) error {
    return validation.ValidateStruct(&task,
        validation.Field(
            &task.Title,
            validation.Required.Error("タイトルが入力されていません"),
            validation.RuneLength(1, 100).Error("タイトルは100文字以内で入力してください"),
        ),
        validation.Field(
            &task.Content,
            validation.Required.Error("内容が入力されていません"),
            validation.RuneLength(1, 300).Error("内容は300文字以内で入力してください"),
        ),
        validation.Field(
            &task.Schedule,
            validation.Required.Error("日時が入力されていません"),
            // 日時が現在時刻より前の場合はエラー
            validation.By(func(value interface{}) error {
                schedule := value.(time.Time)
                if schedule.Before(time.Now()) {
                    return errors.New("日時は現在時刻より後に設定してください")
                }
                return nil
            }),
        ),
    )

}
func (tv *taskValidator) UpdateTaskValidate(task model.UpdateTaskInput) error {
    return validation.ValidateStruct(&task,
        validation.Field(
            &task.Title,
            validation.Required.Error("タイトルが入力されていません"),
            validation.RuneLength(1, 100).Error("タイトルは100文字以内で入力してください"),
        ),
        validation.Field(
            &task.Content,
            validation.Required.Error("内容が入力されていません"),
            validation.RuneLength(1, 300).Error("内容は300文字以内で入力してください"),
        ),
        validation.Field(
            &task.Schedule,
            validation.Required.Error("日時が入力されていません"),
            // 日時が現在時刻より前の場合はエラー
            validation.By(func(value interface{}) error {
                schedule := value.(time.Time)
                if schedule.Before(time.Now()) {
                    return errors.New("日時は現在時刻より後に設定してください")
                }
                return nil
            }),
        ),
    )

}
