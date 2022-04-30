const path = require('path')
const fs = require('fs');

const { messages } = require("../config/messages");
const banners = require("../models/banners");
const product = require("../models/product");
const order = require("../models/order");
const { parseObj } = require("../services/logical");
const { allInOne } = require("../utils/queryHelper");
const { sendSuccessResponse, sendError } = require("../utils/response");
const { uploadImage } = require("../services/s3");

exports.createOrder = async (req, res) => {
  try {
    let data = req.body;
    const orders = await allInOne(order, "insertMany", data.orders);
    if (!orders) return sendError(messages.s_wrong, req, res, 400);
    return sendSuccessResponse(req, res, orders);
  } catch (err) {
    return sendError(err.message, req, res, 500);
  }
};

exports.getProductDetail = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) return sendError(messages.s_wrong, req, res, 400);
    const products = await allInOne(product, "findOne", { _id: id });
    if (!products) return sendError(messages.s_wrong, req, res, 400);
    return sendSuccessResponse(req, res, products);
  } catch (err) {
    return sendError(err.message, req, res, 500);
  }
};

exports.getOrder = async (req, res) => {
  try {
    const { email } = req.body;
    let orders;
    if(!email) orders = await order.find({})
    else orders = await order.find({email})
    const orderCount = await order.countDocuments();
    let allProds = orders;
    return sendSuccessResponse(req, res, allProds, orderCount);
  } catch (err) {
    return sendError(err.message, req, res, 500);
  }
};

exports.uploadProductImage = async (req, res) => {
  try {
    const { file } = req
    if (!file) return sendError(messages.not_file, req, res, 400);
    let paths = path.join(__dirname, `../assets/uploads/${file.originalname}`)
    const fileContent = fs.readFileSync(paths);
    const fileType = file.mimetype.split('/')[1]
    if (!fileContent || !fileType) return sendError(messages.file_error, req, res, 400);
    let uploadedFile = await uploadImage(fileContent, fileType)
    fs.unlinkSync(paths)
    if (!uploadedFile) return sendError(messages.file_error, req, res, 400);
    return sendSuccessResponse(req, res, { url: uploadedFile });
  } catch (err) {
    return sendError(err, req, res, 500);
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    let payload = parseObj(req.body);
    const products = await product.findOneAndUpdate({ _id: id }, payload, { new: true })
    if (!products) return sendError(messages.s_wrong, req, res, 400);
    return sendSuccessResponse(req, res, products);
  } catch (err) {
    return sendError(err.message, req, res, 500);
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    let { id } = req.params;
    const banner = await allInOne(product, "deleteOne", { _id: id });
    if (!banner) return sendError(messages.s_wrong, req, res, 400);
    return sendSuccessResponse(req, res, messages.success);
  } catch (err) {
    return sendError(err.message, req, res, 500);
  }
};