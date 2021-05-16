const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required.']
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last name is required.']
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Use a valid email example: example@example.com'],
      unique: true,
      lowercase: true,
      trim: true
    },
    accountNumber: {
      type: Number,
      unique: true
    },
    hashedPassword: {
      type: String,
      required: [true, 'Password is required.']
    },
    balance: Number,
    profilePicture: String,
    transactions: [String]
  },
  {
    timestamps: true
  }
)

module.exports = model('User', userSchema)