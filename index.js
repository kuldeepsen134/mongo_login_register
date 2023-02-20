const express = require('express')
const app = express()

const cookieParser = require("cookie-parser")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")

require("dotenv").config({ path: __dirname + '/.env' });

const { authJWT } = require('./src/middleware/middleware')



app.use("/", express.static(path.join(__dirname, "/client/build")))

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(authJWT)


require('./src/routes/user')(app)
require('./src/routes/auth')(app)

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"))
})

app.get('*', (req, res) => {

  res.status(404).send({
    message: 'Hunnnn smart!',
    error: true

  })
})


const PORT = process.env.PORT || 5200

app.listen(PORT, () => {
  console.log(`Server is working on ${PORT}`)
})