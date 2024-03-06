const mongoose = require('mongoose');
require("dotenv").config();

main().catch(err => console.log(err));

async function main() {
  // יש לשנות בסוף הכתובת לשם המסד נתונים שאנחנו עובדים מולו בקלאסטר
  // await mongoose.connect('mongodb://127.0.0.1:27017/ariel23_ev');
  await mongoose.connect(process.env.MONGO_CONNECT);
  // await mongoose.connect('mongodb+srv://koko9:MONKE312@cluster0.jq321ikq.mongodb.net/arial23');
  console.log("connect mongo arial23 atlas");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}