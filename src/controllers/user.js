const { User } = require("../models")
const md5 = require("md5")
const jwt = require('jsonwebtoken')
const { handleError, handleResponse } = require("../utils/helpers")
const { registerUser } = require("../utils/common")
const jwtkey = "jwt"


// Register a User

exports.register = async (req, res) => {

  const { error } = registerUser.validate(req.body, { abortEarly: false })

  if (error) {
    return handleError(error, 400, res)
  }
  const { email, password, first_name, last_name, role, } = req.body

  let data = ({
    email,
    password: md5(password),
    first_name,
    last_name,
    role,
  })

  const newUser = new User(data);

  try {

    await newUser.save()

    const token = await jwt.sign({ data }, jwtkey, { expiresIn: '2592000s' })

    const datad = { ...newUser._doc, token }

    handleResponse(res, datad, 201)

  }

  catch (error) {
    res.status(400).send({ error: error.message })
  }
}
