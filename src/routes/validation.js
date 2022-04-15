const Joi = require('joi');

exports.createUser = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.any().required(),
});

exports.getProducts = Joi.object().keys({
    limit: Joi.string().optional(),
    skip: Joi.string().optional(),
    categoryId: Joi.string().optional(),
    searchTerm: Joi.string().optional(),
    isBestSeller: Joi.boolean().optional(),
});

exports.loginUsers = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.any().required(),
});