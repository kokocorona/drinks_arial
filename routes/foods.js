const express = require("express");
const {FoodModel, validateFood} = require("../models/foodModel")
const router = express.Router();

// הגדרת ראוטר של הרואט שנגדיר באפ
router.get("/",async(req,res) => {
  try{
    const data = await FoodModel.find({});
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.post("/", async(req,res) => {
  const validBody = validateFood(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    const food = new FoodModel(req.body);
    await food.save();
    res.status(201).json(food);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.put("/:id",async(req,res) => {
  const validBody = validateFood(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    const id = req.params.id;
    const data = await FoodModel.updateOne({_id:id},req.body);
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.delete("/:id",async(req,res) => {
  try{
    const id = req.params.id;
    const data = await FoodModel.deleteOne({_id:id});
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})
// export default
module.exports = router;