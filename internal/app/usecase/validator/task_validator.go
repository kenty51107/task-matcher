package validator

import (
	"github.com/kenty51107/task-matcher/internal/app/domain/model"
)
type ITaskValidator interface {
    VlidateCreateTask(input *model.CreateTaskInput) error
    VlidateUpdateTask(input *model.UpdateTaskInput) error
    VlidateDeleteTask(input *model.DeleteTaskInput) error
}

type taskValidator struct {}

func NewTaskValidator() ITaskValidator {
    return &taskValidator{}
}

func (tv *taskValidator) VlidateCreateTask(input *model.CreateTaskInput) error {
    err := validate.New().SetFields(validate.Fields{
        "Title": validate.Required.MaxLen(100).ErrorMsg("タイトルを100文字以内で入力してください"),
        "Content": validate.Required.MaxLen(300).ErrorMsg("内容を300文字以内で入力してください"),
        "Schedule": validate.Required.ErrorMsg("日付を入力してください"),
    }),
    Validate(input)
    if err != nil {
        return err
    }
    return nil
}
