const express = require("express");
const router = express.Router();

// הגדרת ראוטר של הרואט שנגדיר באפ
router.get("/",async(req,res) => {
  res.json({msg:"index work 2222"})
})

// export default
module.exports = router;