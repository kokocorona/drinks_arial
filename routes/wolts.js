const express = require("express");
const {WoltModel,validateWolt} = require("../models/woltModel")
const router = express.Router();

// הגדרת ראוטר של הרואט שנגדיר באפ
// /wolts/?skip=10
router.get("/",async(req,res) => {
  // Math.min - מחזיר את המספר הקטן מ2 המספרים בפרמטרים
  // limit - משתנה שמגביל את כמות הרשומות שיחזרו לצד לקוח
  const limit = Math.min(req.query.limit,20) || 5;
  // || - אם הראשון לא נכון ייקח את הערך השני
  // ידאג על כמה רשומות לדלג
  const skip = req.query.skip || 0
  // משתנה שיקבע לפי איזה מאפיין נמיין את המידע מהמסד
  const sort = req.query.sort || "_id";
  // משתנה שדואג אם למיין מהקטן לגדול או מהגדול לקטן
  const reverse = req.query.reverse == "yes" ? 1 : -1; 

  try{
    // SELECT * FROM wolt ORDER BY price ASC LIMIT skip,limit;
    const data = await WoltModel
    .find({})
    .limit(limit)
    .skip(skip)
    // sort - מיון , נותנים מאפיין/עמודה ואחד או מינוס אחד
    // אחד מייצג אסינדינג מהקטן לגדול ומינוס 1 הפוך
    // [] = יחזיר את הערך של הסורט ולא ישתמש בסורט כמאפיין
    .sort({[sort]:reverse})
    res.json(data); 
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

// wolts/search?s=
router.get("/search",async(req,res) => {
  try{
    const searchQ = req.query.s;
    // ביטוי רגולרי
    // i - דואג שלא יהיה בעייתיות של קייס סינסטיב
    const searchExp = new RegExp(searchQ,"i")
    // $or - פקודה מיוחדת של מונגו שמאפשרת לתת פקודת או בשאליתא
    // תמיד תקבל מערך , שבתוכו נכתוב את כל הפילטרים הדרושים
    const data = await WoltModel.find({$or:[{name:searchExp},{category_id:searchExp}]})
    .limit(20)
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

// export default
module.exports = router;