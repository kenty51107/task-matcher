package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/joho/godotenv"
	"github.com/kenty51107/task-matcher/graph/generated"
	handlerlib "github.com/kenty51107/task-matcher/internal/app/adapter/handler"
	"github.com/kenty51107/task-matcher/internal/app/infra/datastore"
	"github.com/kenty51107/task-matcher/internal/app/infra/validator"
	portlib "github.com/kenty51107/task-matcher/internal/app/usecase/port"
	"github.com/kenty51107/task-matcher/internal/app/usecase/service"
	"github.com/rs/cors"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

const defaultPort = "8080"

func RegisterServer(tp portlib.ITaskPort) *handler.Server {
    config := generated.Config{Resolvers: &handlerlib.Resolver{TP: tp}}
    server := handler.NewDefaultServer(generated.NewExecutableSchema(config))

    return server
}

func NewDB() *gorm.DB {
    if err := godotenv.Load(); err != nil {
        log.Fatalln(err)
    }
    url := fmt.Sprintf(
        "%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
        os.Getenv("MYSQL_USER"),
        os.Getenv("MYSQL_PASSWORD"),
        os.Getenv("MYSQL_HOST"),
        os.Getenv("MYSQL_PORT"),
        os.Getenv("MYSQL_DATABASE"),
    )
    db, err := gorm.Open(mysql.Open(url), &gorm.Config{})
    if err != nil {
        log.Fatalln(err)
    }
    fmt.Println("connected!")
    return db
}

func CloseDB(db *gorm.DB) {
    sqlDB, _ := db.DB()
    if err := sqlDB.Close(); err != nil {
        log.Fatalln(err)
    }
    fmt.Println("closed!")
}

func main() {
    fmt.Println(time.Now())

    db := NewDB()
    defer CloseDB(db)

    // seeds.TaskSeed(db)

    port := os.Getenv("PORT")
    if port == "" {
        port = defaultPort
    }

    taskValidator := validator.NewTaskValidator()
    taskDatastore := datastore.NewTaskDatastore(db)
    taskService := service.NewTaskService(taskDatastore, taskValidator)
    taskPort := portlib.NewTaskPort(taskService)
    graphqlHandler := RegisterServer(taskPort)
    c := cors.New(cors.Options{
        AllowedOrigins: []string{"http://localhost:3000"},
        AllowCredentials: true,
    })
    http.Handle("/", playground.Handler("GraphQL playground", "/query"))
    http.Handle("/query", c.Handler(graphqlHandler))

    log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
    log.Fatal(http.ListenAndServe(":"+port, nil))
}
