const indexR = require("./index");
const usersR = require("./users");
const drinksR = require("./drinks")



exports.routesInit = (app) => {
  // הגדרת ראוטים לאיזה ראוטר הם שייכים
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/drinks",drinksR)

}