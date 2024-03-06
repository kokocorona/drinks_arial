const express = require("express");
const { auth } = require("../middlewares/auth");
const { validateDrink, DrinkModel } = require("../models/drinkModel");
const router = express.Router();

// הגדרת ראוטר של הרואט שנגדיר באפ
router.get("/",async(req,res) => {
  const limit = Math.min(req.query.limit,20) || 5;
  const skip = req.query.skip || 0
  const sort = req.query.sort || "_id";
  const reverse = req.query.reverse == "yes" ? 1 : -1; 

  try{
    const data = await DrinkModel
    .find({})
    .limit(limit)
    .skip(skip)
    .sort({[sort]:reverse})
    res.json(data); 
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

// drinks/price?min=8
// קביעת מחירים 
router.get("/price",async(req,res) => {
  const min = req.query.min || 0;
  const max = req.query.max || Infinity;
  try{
    const data = await DrinkModel.find({price:{$gte:min,$lte:max}}).limit(20);
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

// יחזיר את כמות הרשומות בקולקשן
// יעזור לצד לקוח להבין כמה עמודים הוא צריך להציג כאשר הוא מציג רשימה
router.get("/count",async(req,res) => {
  try{
    const limit = req.query.limit || 5;
    const count = await DrinkModel.countDocuments({});
    res.json({count,pages:Math.ceil(count/limit)});
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})


router.post("/",auth,async(req,res) => {
  const validBody = validateDrink(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details)
  }
  try{
    const drink = new DrinkModel(req.body);
    // נוסיף לרשומה את האיי די של המשתמש עם הטוקן
    drink.user_id = req.tokenData._id;
    await drink.save();
    res.status(201).json(drink);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.put("/:id",auth,async(req,res) => {
  const validBody = validateDrink(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details)
  }
  try{
    const id = req.params.id;
    // user_id:... דואג שרק המשתמש שזוהה יוכל לערוך את הרשומה שלו
    const data = await DrinkModel.updateOne({_id:id,user_id:req.tokenData._id},req.body);
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})


router.delete("/:id",auth,async(req,res) => {
  try{
    const id = req.params.id;
    const data = await DrinkModel.deleteOne({_id:id,user_id:req.tokenData._id});
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

// export default
module.exports = router;