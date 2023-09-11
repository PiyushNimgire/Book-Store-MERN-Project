const express = require('express');
const {PORT, mongodbURL} = require('./config');
const mongoose = require('mongoose');
const Book = require('./models/BookModel');
const bookRouter = require('./routes/booksRoutes');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/', (request, response) => {
    return response.status(234).send('Hello world')
});

app.use('/books', bookRouter);

mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log("App connected to databse");
        app.listen(PORT, console.log(`Server is running on port ${PORT}`));
    })
    .catch((err) => {
        console.log(err);
    })