const express = require('express');
const HttpError = require('./utils/http-error');
const db = require('./config/database');
const { Port } = require('./config/index');
const app = express();

const userRoutes = require('./routes/user-routes');
const authorRoutes = require('./routes/author-routes');

app.use(express.json());
app.use('/api',userRoutes);
app.use('/api',authorRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});

try {
    db();
    app.listen(Port);
} catch (err) {
    console.log(err);
}