const { messages } = require("../config/messages")
const product = require("../models/product")
const { allInOne } = require("../utils/queryHelper")
const { sendSuccessResponse, sendError } = require('../utils/response')

exports.createProduct = async (req, res) => {
    try {
        let data = req.body
        const products = await allInOne(product, 'create', data) 
        if(!products) return sendError(messages.s_wrong, req, res, 400)
        return sendSuccessResponse(req, res, products)
    } catch(err){
        return sendError(err.message, req, res, 500)
    }
}

exports.getProduct = async (req, res) => {
    try {
        let { limit, skip, categoryId, searchTerm, isBestSeller} = req.query
        let criteria = {}
        if(categoryId) criteria.category = categoryId
        if(isBestSeller) criteria.isBestSeller = isBestSeller
        if (searchTerm) {
            criteria.title = {
                $regex: searchTerm,
                $options: 'i',
            }
            // criteria.$or = [
            //   {
            //     title: {
            //       $regex: searchTerm,
            //       $options: 'i',
            //     },
            //   },
            //   {
            //     price: {
            //       $regex: searchTerm,
            //       $options: 'i',
            //     },
            //   },
            //   {
            //     "category.title": {
            //       $regex: searchTerm,
            //       $options: 'i',
            //     },
            //   }
            // ]
        }
        limit = limit ? limit : 30
        skip = skip ? skip : 0
        const products = await product.find(criteria).populate({path: 'category', model: "Category"}).skip(parseInt(skip)).limit(parseInt(limit))
        const productCount = await product.countDocuments(criteria)
        return sendSuccessResponse(req, res, products, productCount)
    } catch(err){
        return sendError(err.message, req, res, 500)
    }
}