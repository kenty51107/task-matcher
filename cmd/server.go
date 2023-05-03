package main

import (
	"log"
	"net/http"
	"os"

	handlerlib "github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/kenty51107/task-matcher/graph/generated"
	"github.com/kenty51107/task-matcher/internal/app/adapter/handler"
)

const defaultPort = "8080"

func main() {
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
