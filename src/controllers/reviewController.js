const reviewModel = require('../models/reviewModel')
const mongoose = require('mongoose')
const bookModel = require('../models/bookModel')
const validator=require('../validator/validator')

/******************************************Add Review API********************************************************/
const addReview = async function(req,res){
    try {
        const data = req.body
        const book_Id = req.params.bookId
        console.log(data.rating)
        // bookId.isDeleted =false

        if(!validator.isValidBody(data)) return res.status(400).send({status:false, message:"Please enter the review Details"})
        if(!validator.isValid(data.reviewedBy)) return res.status(400).send({status:false, message:"Please enter the valid reviewer name"})
        if (!data.reviewedBy.match(/^[a-zA-Z. ]+$/)) return res.status(400).send({ status: false, msg: "Reviewer can't be a number" })
        if(!validator.isValid(data.rating)) return res.status(400).send({ status: false, message: "Rating must be present" })
        if(!(data.rating>=1 && data.rating<=5)) return res.status(400).send({status:false, message:"Rating must be in between 1 to 5"})
        if(!validator.isValid(data.review)) return res.status(400).send({ status: false, message: "Review must be present" })
        
        if(!validator.isValidObjectId(book_Id)) return res.status(400).send({status:false, message:"Invalid BookId."})
         let checkBook = await bookModel.findById(book_Id)
         if(!checkBook) return res.status(400).send({status:false, massege:"Book Not Found"})
         data.bookId = checkBook._id
         data.reviewedAt = new Date()

         let saveReview = await reviewModel.create(data)
         if (saveReview) {
            await bookModel.findOneAndUpdate({ _id: saveReview.bookId }, { $inc: { reviews: 1 } })
        }
    
        const reviewDetails = await reviewModel.findOne({ _id: saveReview._id }).select({createdAt: 0,updatedAt: 0,isDeleted: 0, __v: 0})
        
        checkBook.reviewsData=reviewDetails
    
        res.status(201).send({ status: true, message: "review created successfully", data: checkBook })
        
        
    } catch (err) {
        res.status(500).send({status:false,error:err.message})
        
    }

}





module.exports.addReview = addReview