const { Router } = require('express')
const router = new Router()

const User = require('../models/User.model')
const Transactions = require('../models/Transactions.model')
const mongoose = require('mongoose')

const fileUploader = require('../configs/cloudinary.config')


router.route('/transfer/:id')
    .get((req, res, next) => {
        const { id } = req.params
        User.findById(id)
        .then(theUser => {
            res.render('operations/transfer', {
                user: theUser,
                userInSession: req.session.currentUser
            })
        })
        
    })
    .post((req, res, next)=>{
        
    })

module.exports = router;