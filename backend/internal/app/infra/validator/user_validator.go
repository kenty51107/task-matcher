package validator

import (
	"strings"

	"github.com/go-playground/validator/v10"
)

type IUserValidator interface {
    Validate(obj interface{}) error
    GetValidateError(err error) string
}

type userValidator struct {
    validate *validator.Validate
}

func NewUserValidator() *userValidator {
    return &userValidator{validate: validator.New()}
}

func (uv *userValidator) Validate(obj interface{}) error {
    return uv.validate.Struct(obj)
}

func (uv *userValidator) GetValidateError(err error) string {
    var validateError []string
    for _, err := range err.(validator.ValidationErrors) {
        var errMessage string
        field := err.Field()
        switch field {
        case "ID":
            errMessage = "IDを入力してください"
        case "Name":
            tagType := err.Tag()
            switch tagType {
            case "required":
                errMessage = "名前を入力してください"
            case "max":
                errMessage = "名前は100文字以内で入力してください"
            }
        case "Email":
            tagType := err.Tag()
            switch tagType {
            case "required":
                errMessage = "メールアドレスを入力してください"
            case "max":
                errMessage = "メールアドレスは255文字以内で入力してください"
            }
        case "Password":
            tagType := err.Tag()
            switch tagType {
            case "required":
                errMessage = "パスワードを入力してください"
            case "max":
                errMessage = "パスワードは255文字以内で入力してください"
            }
        }
        validateError = append(validateError, errMessage)
    }
    return strings.Join(validateError, ", ")
}
