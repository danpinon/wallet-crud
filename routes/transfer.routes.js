const { Router } = require('express')
const router = new Router()

const User = require('../models/User.model')
const Transactions = require('../models/Transaction.model')
const mongoose = require('mongoose')

const fileUploader = require('../configs/cloudinary.config')


router.route('/transfer/:id')
    .get((req, res, next) => {
        const { id } = req.params
        User.findById(id)
        .then(theUser => {
            console.log('user xx:', theUser)
            res.render('operations/transfer/transfer', {
                user: theUser,
                userInSession: req.session.currentUser
            })
        })
        
    })
    .post((req, res, next)=>{
        const { id } = req.params
        User.findById(id)
    })

    router.route('/transfer/:id/transfer-ian')
    .get((req, res, next) => {
        const { id } = req.params
        User.findById(id)
        .then(theUser => {
            res.render('operations/transfer/transfer-ian', {
                user: theUser,
                userInSession: req.session.currentUser
            })
        })
        
    })
    .post((req, res, next)=>{
        const { id } = req.params
        User.findById(id)
    })

    router.route('/transfer/:id/:dest-acc-num')
        .get((req, res, next) => {
            const { accountNumber } = req.params
            console.log(req.params)
            User.findOne({ accountNumber })
            .then(theDestinatary => {
                res.render('operations/transfer/destinatary', {
                    destinatary: theDestinatary,
                    userInSession: req.session.currentUser
                })
            })
        })


module.exports = router;