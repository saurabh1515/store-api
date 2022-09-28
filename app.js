require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()

const productRouter = require("./routes/products")
const notFound = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")
const connectDB = require("./db/connect")

// middleware
app.use(express.json())

//routes
app.get("/", (req, res) => {
  res.send(
    '<h1> Store API </h1> <a href="api/v1/products"> products route </a>'
  )
})

// products routes
app.use("/api/v1/products", productRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)

//start the server
const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
