const { Router } = require('express')
const router = new Router()

const User = require('../models/User.model')
const Transaction = require('../models/Transaction.model')
const mongoose = require('mongoose')

const fileUploader = require('../configs/cloudinary.config')

// ROUTES

router.get('/account/:id', (req, res) => {
  const { id } = req.params
  User.findById(id)
    .then(theUser => {
      res.render('users/user-profile', {
        user: theUser,
        userInSession: req.session.currentUser
      })
    })

})

// IMAGE UPDATE NOT WORKING //
router.route('/settings/:id')
  .get((req, res, next) => {
    const { id } = req.params
    User.findById(id)
      .then(theUser => {
       
        req.session.currentUser = theUser
        res.render('users/settings', {
          user: theUser,
          userInSession: req.session.currentUser
        })
      })
      .catch(error => {
        console.log('Error on edit user:', error)
        next(error)
      })
  })
  .post(fileUploader.single('image'), (req, res) => {
    const { id } = req.params
    // const { profilePicture } = req.body
    console.log('---------------------')
    console.log(req.file)
    console.log('---------------------')
    // User.findByIdAndUpdate(id, { profilePicture: req.file.path }, { new: true })
    //   .then(() => res.redirect('/account'))
    //   .catch(error => console.log(`Error while updating user: ${error}`))
  })

// DEPOSIT

module.exports = router;