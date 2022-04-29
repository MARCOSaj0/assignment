const jwt = require('jsonwebtoken');
const HttpError = require('../utils/http-error');
const { p_key } = require('../config/index');

module.exports = async (req, res, next) => {
    try {
        const authHeader = await req.headers["authorization"];
        if(!authHeader) {
            throw new HttpError("You don't have access key for current operation");
        }
        const bearer = await authHeader.split(" ");
        const token = await bearer[1];
        jwt.verify(token, privateKey, (err, user) => {
            if (err) {
                throw new HttpError("You are not Authorized for this operation");
            } else {
                req.user = user;
            }
        });
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, data: null, message: err.message });
    }
};