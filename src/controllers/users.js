const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();


const { sendSuccessResponse, sendError } = require('../utils/response')
const { messages } = require('../config/messages')
const user = require('../models/user')
const { allInOne } = require('../utils/queryHelper');

exports.registerUser = async(req, res) => {
    const { name, email, password } = req.body
    try {
        if(!name || !email || !password) return sendError(messages.id_required, req, res, 400)
        const isExist = await allInOne(user, 'findOne', { email: email}) 
        if(isExist) return sendError(messages.email_exist, req, res, 400)
        bcrypt.genSalt(12, async function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                const userData = await allInOne(user, 'create', { name, email, password: hash})
                if(!userData) return sendError(messages.s_wrong, req, res, 400)
                return sendSuccessResponse(req, res, userData)
            });
        });
    } catch(err){
        sendError(err.message, req, res, 400)
    }
}

exports.loginUser = async(req, res) => {
    const { email, password } = req.body
    try {
        if(!email || !password) return sendError(messages.id_required, req, res, 400)
        let isExist = await allInOne(user, 'findOne', { email: email}) 
        if(!isExist) return sendError(messages.u_not_exist, req, res, 400)
        bcrypt.compare(password, isExist.password , async function(err, result) {
            if(err) return sendError(err, req, res, 400)
            if(!result) return sendError(messages.incorrect_pass, req, res, 400)
            const token = jwt.sign({ id: isExist._id }, process.env.SECRET, { expiresIn: "3d" })
            isExist = Object(isExist)
            isExist.password = undefined
            return sendSuccessResponse(req, res, {user: isExist, token})
        });
    } catch(err){
        sendError(err.message, req, res, 400)
    }
}