const path = require('path')
const fs = require('fs');

const { messages } = require("../config/messages");
const banners = require("../models/banners");
const product = require("../models/product");
const { parseObj } = require("../services/logical");
const { allInOne } = require("../utils/queryHelper");
const { sendSuccessResponse, sendError } = require("../utils/response");
const { uploadImage } = require("../services/s3");

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
    const banner = await banners.find({ category: { $in: category } })
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
    let allProds = products[0]
    allProds.banners = banner
    return sendSuccessResponse(req, res, allProds, productCount);
  } catch (err) {
    return sendError(err.message, req, res, 500);
  }
};

exports.uploadProductImage = async(req, res) => {
  try {
    const { file } = req
    if (!file)  return sendError(messages.not_file, req, res, 400);
    let paths = path.join(__dirname, `../assets/uploads/${file.originalname}`)
    const fileContent = fs.readFileSync(paths);
    const fileType = file.mimetype.split('/')[1]
    if(!fileContent || !fileType)  return sendError(messages.file_error, req, res, 400);
    let uploadedFile = await uploadImage(fileContent, fileType)
    fs.unlinkSync(paths)
    if(!uploadedFile)  return sendError(messages.file_error, req, res, 400);
    return sendSuccessResponse(req, res, { url: uploadedFile});
  } catch(err){
    return sendError(err.message, req, res, 500);
  }
}