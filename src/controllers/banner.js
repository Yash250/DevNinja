const { messages } = require("../config/messages");
const banners = require("../models/banners");
const { parseObj } = require("../services/logical");
const { allInOne } = require("../utils/queryHelper");
const { sendSuccessResponse, sendError } = require("../utils/response");

exports.createBanners = async (req, res) => {
  try {
    let data = req.body;
    const banner = await allInOne(banners, "insertMany", data.banner);
    if (!banner) return sendError(messages.s_wrong, req, res, 400);
    return sendSuccessResponse(req, res, banner);
  } catch (err) {
    return sendError(err.message, req, res, 500);
  }
};

exports.getBanners = async (req, res) => {
    try {
        const banner = await allInOne(banners, 'find', {}, null, {imageURL:1, _id:0,clickedURL:1}) 
        return sendSuccessResponse(req, res, banner)
    } catch(err){
        return sendError(err.message, req, res, 500)
    }
}