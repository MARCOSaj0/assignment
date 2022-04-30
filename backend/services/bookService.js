const Book = require('../models/book');
const Author = require('../models/author');
const HttpError = require('../utils/http-error');

const createBook = async (data) => {
    const { name, pub_on, price, author } = data;
    const pub_d = new Date(pub_on).toISOString();
    try {
        const book = new Book({
            name, pub_on: pub_d, price, author
        });
        const upAuthor = await Author.findByIdAndUpdate(author,{$push: {books: book._id}});
        await book.save();
        return book;
    } catch (err) {
        console.log(err);
        throw new HttpError(err.message || "Book Creation failed.");
    }
};

const getBooks = async() => {
    try {
        const books = await Book.find().populate({
            path: "author",
            select: "name age"
        });
        return books;
    } catch (err) {
        console.log(err);
        throw new HttpError(err.message || "Error in getting list of authors.");
    }
}

const deleteBook = async(id) => {
    try {
        const book = await Book.findByIdAndDelete(id);
        const upAuthor = await Author.findByIdAndUpdate(id,{$pull: {books: book._id}});
        return 'Book deleted successfully';
    } catch (err) {
        console.log(err);
        throw new HttpError(err.message || "Error in getting list of authors.");
    }
}

module.exports = {createBook, getBooks, deleteBook};