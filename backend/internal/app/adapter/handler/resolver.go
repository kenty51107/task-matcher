package handler

import "github.com/kenty51107/task-matcher/internal/app/usecase/port"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{
    TP port.ITaskPort
    UP port.IUserPort
}
