const { parseObj } = require('../services/logical');
const { sendError } = require('../utils/response')


exports.paramsValidator = (schema, isGet, isParse) => async (req, res, next) => {
    try {
        const data =  isGet ? req.query : req.body;
        const validationRes = schema.validate(isParse ? parseObj(data) : data);
        if (validationRes.error) {
            console.log('err', validationRes)
            return sendError(validationRes.error, req, res, 400);
        } else {
            next();
        }
    } catch (err) {
        return sendError(err.message, req, res, 400);
    }
}