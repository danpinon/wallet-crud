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
        console.log('transfer ian:', req.params)
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

    router.route('/transfer/:id/search/')
        .get((req, res, next) => {
            const { destAccNum } = req.query
            console.log('request:', req.query)
            User.findOne({ destAccNum })
            .then(theDestinatary => {
                console.log('theDestinatary', theDestinatary)
                res.render('operations/transfer/transfer-destinatary', {
                    destinatary: theDestinatary,
                    userInSession: req.session.currentUser
                })
            })
        })

    router.route('/transfer/:id/search/:destAccNum/amount')
        .get((req, res, next) => {
            res.render('operations/transfer/transfer-amount')
        })


module.exports = router;