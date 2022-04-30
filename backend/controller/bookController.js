const bookServices = require('../services/bookService');

const createBook = async (req, res) => {
    try {
        const details = await bookServices.createBook(req.body);
        res.status(200).json({ details });
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, data: null, message: err.message});
    }
};

const getBooks = async (req, res) => {
    try {
        const details = await bookServices.getBooks();
        res.status(200).json({ details });
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, data: null, message: err.message});
    }
};

const deleteBook = async (req, res) => {
    const id = req.params.id;
    try {
        const details = await bookServices.deleteBook(id);
        res.status(200).json({ details });
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, data: null, message: err.message});
    }
};

module.exports = {createBook, getBooks, deleteBook};