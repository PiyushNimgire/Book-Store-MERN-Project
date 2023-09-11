const express = require('express');
const bookRouter = express.Router();
const Book = require('../models/BookModel');
//route to add new book using post request
bookRouter.post('/',async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            res.status(400).send({
                message: "Send all book details: title, author, publish year"
            })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
});

//route to get all books from db
bookRouter.get('/',async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).send(books);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
})

//route to get single book using its id from db
bookRouter.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        return res.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
})

//route to update single book using its id from db
bookRouter.put('/:id', async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            res.status(400).send({
                message: "Send all book details: title, author, publish year"
            })
        }

        const result = await Book.findByIdAndUpdate(req.params.id, req.body);
        if(!result){
            return res.status(404).send({message: 'Book did not found'});
        }
        
        return res.status(200).send({message: 'Book Updated Successfully'});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
})

//route to delete single book using its id from db
bookRouter.delete('/:id', async (req, res) => {
    try {
        const result = await Book.findByIdAndDelete(req.params.id);
        if(!result){
            return res.status(404).send({message: 'Book did not found'});
        }
        
        return res.status(200).send({message: 'Book Deleted Successfully'});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
})

module.exports = bookRouter;