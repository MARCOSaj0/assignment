require('dotenv').config();

module.exports = {
    URI : process.env.MongoURI,
    Port : process.env.PORT,
    p_key : process.env.PrivateKey
};