const orderModel = require("../models/orderModel")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")
const mongoose = require('mongoose');

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
};

const createOrder = async function (req, res) {
    let data = req.body,
  freeuser = data.isFreeAppUser;
    let { userId, productId } = data;

    if (!userId || !isValidObjectId(userId)) {
        return res.send({ status: false, message: " userId is Required or User is not present" });
    }
    if (!productId || !isValidObjectId(productId)) {
        return res.send({ status: false, message: "Product ID is Required or product is not present" });
    }
    if (freeuser === "true") {
        let productAmount = await productModel.findById(productId).select({ price: 1, _id: 0 })
        productAmount = productAmount.price
        let userBalance = await userModel.findById(userId).select({ balance: 1, _id: 0 })
        userBalance = userBalance.balance

        if (userBalance >= productAmount) {
            data.amount = productAmount;
            data.isFreeAppUser = false;
            let savedData = await orderModel.create(data)
         //   let updateUser = await userModel.findByIdAndUpdate({ _id: userId }, { $inc: { balance: -productAmount } }, { new: true }).select({ balance: 1, _id: 0 })
            return res.send({ msg: savedData })
        }
        return res.send({ msg: "Insufficient balance" })
    }
    else{
        data.amount = 0
        let savedData = await orderModel.create(data)
        res.send({ msg: savedData })
    }
}

module.exports = createOrder;