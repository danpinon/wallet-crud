const { Router } = require('express')
const router = new Router()

const User = require('../models/User.model')
const Transactions = require('../models/Transactions.model')
const mongoose = require('mongoose')

const fileUploader = require('../configs/cloudinary.config')


router.route('/transfer')
    .get((req, res, next) => {
        console.log(req.session.currenUser)
        res.render('operations/transfer')
    })
    .post((req, res, next)=>{
        
    })

module.exports = router;