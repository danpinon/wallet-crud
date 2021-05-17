const { Router } = require('express')
const router = new Router()

const bcrypt = require('bcrypt')
const saltRounds = 10

const User = require('../models/User.model')
const Transaction = require('../models/Transaction.model')
const mongoose = require('mongoose')



module.exports = router;