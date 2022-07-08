const express=require('express')
const router= express.Router()
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const reviewController = require('../controllers/reviewController')
const {authentication,authorization} = require('../middleware/authentication')


//----------------[Create User]
router.post('/register', userController.createUser)
//----------------[Login User]
router.post('/login', userController.loginUser)
//----------------[Create Books]
router.post('/books',authentication,authorization,bookController.createBook)
//----------------[Get Books]
router.get('/books',authentication,bookController.getBook)
//----------------[Get Books by Id]
router.get('/books/:bookId',authentication,bookController.getBookById)
//----------------[Update Books]
router.put('/books/:bookId',authentication,authorization,bookController.updateBook)
//-----------------[Delete Book]
router.delete('/books/:bookId',authentication,authorization,bookController.deleteBook)
//..................[Add Review]
router.post('/books/:bookId/review', reviewController.addReview)




module.exports=router
