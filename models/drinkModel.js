const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
  name: String,
  cals: Number,
  price: Number,
  img_url: String,
  // מכיל את האיי די של המשתמש שיוסיף רשומה
  user_id:String
})
exports.DrinkModel = mongoose.model("drinks", schema)

exports.validateDrink = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    cals: Joi.number().min(1).max(999).required(),
    price: Joi.number().min(1).max(999).required(),
    img_url: Joi.string().min(2).max(400).allow(null, ""),
  })
  return joiSchema.validate(_reqBody)
}


