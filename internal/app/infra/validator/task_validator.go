package validator

import (
	"strings"

	"github.com/go-playground/validator/v10"
)

type ITaskValidator interface {
    Validate(obj interface{}) error
    GetValidateError(err error) string
}

type taskValidator struct {
    validate *validator.Validate
}

func NewTaskValidator() *taskValidator {
    return &taskValidator{validate: validator.New()}
}

func (tv *taskValidator) Validate(obj interface{}) error {
    return tv.validate.Struct(obj)
}

func (tv *taskValidator) GetValidateError(err error) string {
    var validateError []string
    for _, err := range err.(validator.ValidationErrors) {
        var errMessage string
        field := err.Field()
        switch field {
        case "ID":
            errMessage = "IDを入力してください"
        case "Title":
            tagType := err.Tag()
            switch tagType {
            case "required":
                errMessage = "タイトルを入力してください"
            case "max":
                errMessage = "タイトルは100文字以内で入力してください"
            }
        case "Content":
            tagType := err.Tag()
            switch tagType {
            case "required":
                errMessage = "内容を入力してください"
            case "max":
                errMessage = "内容は300文字以内で入力してください"
            }
        case "Schedule":
            errMessage = "日付を入力してください"
        }
        validateError = append(validateError, errMessage)
    }
    return strings.Join(validateError, ", ")
}
