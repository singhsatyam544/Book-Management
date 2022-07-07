const express=require('express')
const router= express.Router()
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const {authentication,authorization} = require('../middleware/authentication')


/******************[User APIs]**********************************************/
router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)

/********************[Book APIs]********************************************/
router.post('/books',authentication,authorization,bookController.createBook)

router.get('/books',authentication,bookController.getBook)
router.get('/books/:bookId',authentication,bookController.getBookById)

router.put('/books/:bookId',authentication,authorization,bookController.updateBook)
router.delete('/books/:bookId',authentication,authorization,bookController.deleteBook)

module.exports=router