package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	handlerlib "github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/joho/godotenv"
	"github.com/kenty51107/task-matcher/graph/generated"
	"github.com/kenty51107/task-matcher/internal/app/adapter/handler"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

const defaultPort = "8080"

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
    db := NewDB()
    defer CloseDB(db)

    port := os.Getenv("PORT")
    if port == "" {
        port = defaultPort
    }

    srv := handlerlib.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &handler.Resolver{}}))
    http.Handle("/", playground.Handler("GraphQL playground", "/query"))
    http.Handle("/query", srv)

    log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
    log.Fatal(http.ListenAndServe(":"+port, nil))
}
