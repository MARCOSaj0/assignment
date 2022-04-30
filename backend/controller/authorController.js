const authorServices = require('../services/authorService');

const createAuthor = async (req, res) => {
    try {
        const details = await authorServices.createAuthor(req.body);
        res.status(200).json({ details });
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, data: null, message: err.message});
    }
};

module.exports = {createAuthor};