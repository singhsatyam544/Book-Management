const reviewModel = require('../models/reviewModel')
const mongoose = require('mongoose')

const reviewCreate = async function(req,res){
    try {
        const data = req.body

        
    } catch (err) {
        res.status(500).send({status:false,error:err.message})
        
    }

}
