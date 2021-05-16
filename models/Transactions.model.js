const mongoose = require('mongoose')
const { Schema, model } = mongoose

const transactionSchema = new Schema(
  {
    remitent: {
      type: Schema.Types.ObjectId, ref: "User",
    },
    destinatary: {
      type: String,
      required: [true, 'Destinatary is required.']
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required.']
    },
    deposit: Boolean
  },
  {
    timestamps: true
  }
)

module.exports = model('Transactions', transactionSchema)