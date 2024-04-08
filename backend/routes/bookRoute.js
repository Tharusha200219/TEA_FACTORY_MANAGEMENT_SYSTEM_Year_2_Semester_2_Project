import  express  from "express";
import {Book} from '../models/bookModel.js';

const router = express.Router();


// post a new book

router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name,type,regnum',
            });

        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//get all books from database

router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books

        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// get the book by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const books = await Book.findById(id);

        return response.status(200).json(books);


    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//update
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {

            return response.status(400).send({
                message: 'send all required fields: title,author,publishyear',
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).send({ message: 'Book updated succesfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//delete
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });

        }
        return response.status(200).send({ message: 'Book deleted' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;