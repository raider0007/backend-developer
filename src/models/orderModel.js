const mongoose = require('mongoose');
const Id = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    userId: {
        type: Id,
        required: true,
        ref: "User"
    },
    productId: {
        type: Id,
        required: true,
        ref: "Product"
    },
    amount: Number,
    isFreeAppUser: {
        type: Boolean,
        default: false
    },
    date:{
        type:Date,
        default:Date.now,
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema)