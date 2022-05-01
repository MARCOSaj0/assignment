const jwt = require('jsonwebtoken');
const User = require('../models/user');
const HttpError = require('../utils/http-error');
const bcrypt = require('bcrypt');
const { p_key } = require('../config');

const signupService = async (data) => {
    const { name, email, password } = data;
    try {
        const hasUser = await User.findOne({ email });
        if (hasUser) {
            throw new HttpError("Could not create account, email already exists.");
        }
        const hashedPwd = await bcrypt.hash(password, 12);
        if (!hashedPwd) {
            throw new HttpError("Sorry we are facing issue in register");
        }
        const newUser = new User({
            name, email, password: hashedPwd
        });
        await newUser.save();
        return newUser;
    } catch (err) {
        console.log(err);
        throw new HttpError(err.message || "User signup failed.");
    }
};

const loginService = async (data) => {
    const { email, password } = data;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new HttpError("No user found.");
        }
        const isPwdValid = await bcrypt.compare(password, user.password);
        if (!isPwdValid) {
            throw new HttpError("Credentials did not match.");
        }
        const token = jwt.sign(
            { name: user.name, email }, 
            p_key, 
            { expiresIn: "1d"}
        );
        if (!token) {
            throw new HttpError("Failed in token Creation");
        }
        return token;
    } catch (err) {
        console.log(err);
        throw new HttpError(err.message || "Login failed.");
    }
};

module.exports = { signupService, loginService };