const mongoose = require("mongoose");
const Joi = require("joi");

const woltSchema = new mongoose.Schema({
  name:String,
  cals:Number,
  price:Number,
  img_url:String,
  category_id:String
},{timestamps:true})


exports.WoltModel = mongoose.model("wolts",woltSchema);

exports.validateWolt = (_reqBody) => {
  const joiSchema = Joi.object({
    name:Joi.string().min(2).max(100).required(),
    cals:Joi.number().min(0).max(9999).required(),
    price:Joi.number().min(1).max(999).required(),
    img_url:Joi.string().min(2).max(300),
    category_id:Joi.string().min(2).max(100).required(),
  })
  return joiSchema.validate(_reqBody)
}