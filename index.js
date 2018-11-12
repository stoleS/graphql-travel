const express = require("express")
const logger = require("morgan")

// GraphQL schema and dependencies
const schema = require("./schema/schema")
const graphqlHTTP = require("express-graphql")

// App definition
const app = express()

// GraphQL endpoints
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }))

// Middleware
app.use(logger("dev"))

// Error handler
app.use((err, req, res, next) => {
  const error = app.get("end") === "development" ? err : {}
  const status = err.status || 500

  // After that respond to the client
  res.status(status).json({
    error: {
      message: error.message
    }
  })

  // Push to the terminal
  console.error(err)
})

// Start the server
const port = app.get("port") || 4000
app.listen(port, () => {
  console.log("Server started on port 4000...")
})
