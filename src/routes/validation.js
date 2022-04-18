const Joi = require('joi');

exports.createUser = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.any().required(),
});

exports.getProducts = Joi.object().keys({
    limit: Joi.number().optional(),
    skip: Joi.number().optional(),
    searchTerm: Joi.string().optional(),
    isBestSeller: Joi.boolean().optional(),
    category: Joi.array().optional(),
    subCategory: Joi.array().optional(),
});

exports.loginUsers = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.any().required(),
});

exports.cartUser = Joi.object().keys({
    cartItems: Joi.array().required(),
});

exports.addressSchema = Joi.object().keys({
    addresses: Joi.array().required(),
});