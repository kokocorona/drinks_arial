const mongoose = require("mongoose");
const Joi = require("joi");

const foodSchema = new mongoose.Schema({
  name:String,
  price:Number,
  // dateCreated:{
  //   type:Date, default:Date.now
  // }
  // {timestamps:true} - מוסיף 2 רשומות של תאריך יצירה ועריכה
},{timestamps:true})

exports.FoodModel = mongoose.model("foods",foodSchema);


exports.validateFood = (_reqBody) => {
  const joiSchema = Joi.object({
    name:Joi.string().min(2).max(100).required(),
    // allow - מאפשר לשלוח את המאפיין עם סטרינג ריק מה שיקרה במציאות מטופס 
    price:Joi.number().min(1).max(999).allow(null,"")
  })
  return joiSchema.validate(_reqBody);
}