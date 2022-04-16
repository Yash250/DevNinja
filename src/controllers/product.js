const { messages } = require("../config/messages");
const product = require("../models/product");
const { parseObj } = require("../services/logical");
const { allInOne } = require("../utils/queryHelper");
const { sendSuccessResponse, sendError } = require("../utils/response");

exports.createProduct = async (req, res) => {
  try {
    let data = req.body;
    const products = await allInOne(product, "insertMany", data.products);
    if (!products) return sendError(messages.s_wrong, req, res, 400);
    return sendSuccessResponse(req, res, products);
  } catch (err) {
    return sendError(err.message, req, res, 500);
  }
};

exports.getProductDetail = async (req, res) => {
    try {
      let { id } = req.params;
      if (!id) return sendError(messages.s_wrong, req, res, 400);
      const products = await allInOne(product, "findOne", {_id: id});
      if (!products) return sendError(messages.s_wrong, req, res, 400);
      return sendSuccessResponse(req, res, products);
    } catch (err) {
      return sendError(err.message, req, res, 500);
    }
  };

exports.getProduct = async (req, res) => {
  try {
    let payload = parseObj(req.query);
    let { limit, skip, searchTerm, isBestSeller, category, subCategory, sortBy } =
      payload;
    let criteria = {};
    if(!sortBy) sortBy = 'createdAt'
    if (subCategory) criteria.subCategory = { $in: subCategory };
    if (category) criteria.category = { $in: category };
    if (isBestSeller) criteria.isBestSeller = isBestSeller;
    if (searchTerm) {
      criteria.title = {
        $regex: searchTerm,
        $options: "i",
      };
    }
    limit = limit ? limit : 30;
    skip = skip ? skip : 0;
    const products = await product.aggregate([
      {$match: criteria},
      {
        $group: {
          _id: "$subCategory",
          data: { $push: "$$ROOT" },
        },
      },
      {
        $group: {
          _id: null,
          data: {
            $push: {
              k: "$_id",
              v: "$data",
            },
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $arrayToObject: "$data" },
        },
      },
    ]).skip(parseInt(skip)).limit(parseInt(limit)).sort({sortBy: -1});
    const productCount = await product.countDocuments(criteria);
    return sendSuccessResponse(req, res, products[0], productCount);
  } catch (err) {
    return sendError(err.message, req, res, 500);
  }
};
