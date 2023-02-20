const Joi = require('joi')

const registerUser = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),

    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
    loginId: Joi.string().required(),

    role: Joi.string(),
})

const login = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),

})
const resetEmail = Joi.object().keys({
    email: Joi.string().email().required(),

})
module.exports = {
    registerUser,
    login,
    resetEmail

}