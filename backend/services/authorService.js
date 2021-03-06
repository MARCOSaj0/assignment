const Author = require('../models/author');
const HttpError = require('../utils/http-error');

const createAuthor = async (data) => {
    const { name, age, dob } = data;
    const d_o_b = new Date(dob).toISOString();
    // const date = new Date();
    try {
        const author = new Author({
            name, age, dob: d_o_b
        });
        // console.log(author, date);
        await author.save();
        return author;
    } catch (err) {
        console.log(err);
        throw new HttpError(err.message || "Author Creation failed.");
    }
};

const getAuthors = async() => {
    try {
        const authors = await Author.find().select('_id name');
        return authors;
    } catch (err) {
        console.log(err);
        throw new HttpError(err.message || "Error in getting list of authors.");
    }
}

module.exports = {createAuthor, getAuthors};