package seeds

import (
	"log"
	"time"

	"github.com/kenty51107/task-matcher/internal/app/domain/model"
	"gorm.io/gorm"
)

func TaskSeed(db *gorm.DB) {
    tasks := []model.Task{
        {
            Title: "タスク1",
            Content: "タスク1の内容",
            Schedule: time.Now(),
            Done: false,
            CreatedAt: time.Now(),
            UpdatedAt: time.Now(),
        },
        {
            Title: "タスク2",
            Content: "タスク2の内容",
            Schedule: time.Now(),
            Done: false,
            CreatedAt: time.Now(),
            UpdatedAt: time.Now(),
        },
    }

    for _, task := range tasks {
        err := db.Create(&task).Error
        if err != nil {
            log.Fatalf("failed to seed tasks: %v", err)
        }
    }
}
