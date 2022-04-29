const jwt = require('jsonwebtoken');
const User = require('../models/user');
const HttpError = require('../utils/http-error');
const bcrypt = require('bcrypt');

const signupService = async (data) => {
    const { name, email, password } = data;
    let hasUser;
    try {
        hasUser = await User.findOne({email: email});
    } catch (err) {
        console.log(err);
        throw new HttpError('Internal Server Error.', 500);
    }
    if (hasUser) {
        throw new HttpError('Could not create user, email already exists.', 422);
    }
    let hashedPwd;
    try {
        hashedPwd = await bcrypt.hash(password, 12);
    } catch (err) {
        console.log(err);
        throw new HttpError('Internal Server Error.', 500);
    }
    const newUser = new User({
        name, email, password: hashedPwd
    });
    try {
        await newUser.save();
        return newUser;
    } catch (err) {
        console.log(err);
        throw new HttpError('User signup failed.', 500);
    }
};

const loginService = async (data) => {
    const { email, password } = data;
    let user;
    try {
        user = await User.findOne({email: email});
    } catch (err) {
        console.log(err);
        throw new HttpError('Internal error');
    }
    if (!user) {
      throw new HttpError('No user found.', 401);
    }
    let isPwdValid = false;
    try {
        isPwdValid = await bcrypt.compare(password, user.password);
    } catch (err) {
        console.log(err);
        throw new HttpError('Internal Server Error.', 500);
    }
    if (!isPwdValid) {
        throw new HttpError('Credentials did not match.', 401);
    }
    let token;
    var privateKey = fs.readFileSync('jwtRS256.key');
    try{
        token = jwt.sign(
            {userId: user.id, userName: user.name, userEmail: user.email},
            // 'this is my key',
            privateKey,
            { algorithm: 'RS256', expiresIn: '1h'}
        );
        const details =  {userId: user.id, userName: user.name, userEmail: user.email, token};
        return details;
    } catch (err) {
        console.log(err);
        throw new HttpError('Internal error');
    }
};

module.exports = { signupService, loginService };