const { Router } = require('express')
const router = new Router()

const bcrypt = require('bcrypt')
const saltRounds = 10

const User = require('../models/User.model')
const Transaction = require('../models/Transaction.model')
const mongoose = require('mongoose')

router.route('/signup')
  .get((req, res) => {
    res.render('auth/signup')
  })
  .post((req, res, next) => {
    const { name, lastName, email, password } = req.body

    // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/ // Checks that it have 7 chars or more.

    // Validations
    if (!name || !lastName || !email || !password) {
      res.render('auth/signup', {
        errorMessage: "All the fields must be filled."
      })
      return
    }

    // if (!regex.test(password)) {
    //   res.status(500).render('auth/signup', {
    //     errorMessage: 'The password must have at least 8 characters'
    //   })
    //   return
    // }

    const accountNumber = Math.floor(100000 + Math.random() * 900000)

    const profilePicture = 'https://res.cloudinary.com/dmmhvh1ai/image/upload/v1621011645/no-profile-picture_z56xhn.jpg'
    const balance = 0
    bcrypt
      .hash(password, saltRounds)
      .then(hashedPassword => {
        return User.create({
          name,
          lastName,
          email,
          hashedPassword,
          accountNumber,
          profilePicture,
          balance
        })
      })
      .then(userFromDB => {
        console.log('user created succesfully')
        res.redirect('/login')
        return
      })
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.status(500).render('auth/signup', {
            errorMessage: error.message
          })
        } else if (error.code === 11000) {
          res.status(500).render('auth/signup', {
            errorMessage: "The email is already registered."
          })
        } else {
          console.log(error)
        }
      })
  })


router.route('/login')
  .get((req, res) => {
    res.render('auth/login')
  })
  .post((req, res, next) => {
    // console.log('SESSION:', req.session)

    const { email, password } = req.body
    if (email === "" || password === "") {
      res.render('auth/login', {
        errorMessage: 'Please fill all fields'
      })
      return
    }

    User.findOne({ email })
      .then((userFound) => {
        console.log('user found:',userFound._id)
        if (!userFound) {
          res.render('auth/login', {
            errorMessage: 'The email is not registered'
          })
          return
        } else if (bcrypt.compareSync(password, userFound.hashedPassword)) {
          req.session.currentUser = userFound
          res.redirect(`/account/${userFound._id}`)
        } else {
          res.render('auth/login', {
            errorMessage: 'Incorrect password.'
          })
        }
      })
      .catch(error => next(error))
  })

router.post('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})


module.exports = router;