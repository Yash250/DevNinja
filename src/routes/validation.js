const Joi = require('joi');

exports.createUser = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.any().required(),
});

exports.loginUsers = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.any().required(),
});