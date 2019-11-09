var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
    res.render('home');
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });
  //Joel Start Code
  app.post("/loginTest", function(req,res) {
    // var userName = req.body.username;
    // var password = req.body.password;
    // var userName = "testUser1";
    // var password = "ABC123";

    console.log(req.body);
    
    db.users.findAll({}).then(function(dbusers) {
      res.json(dbusers);
      dbusers.forEach(function(element){
        if (req.body.username == element.dataValues.username){
          // console.log(element.dataValues.userID);
          // Username is in database, Now check password
          if(req.body.password === element.dataValues.user_password) {
            //Render Home Page with UserID (AUSTIN)
            console.log("Username and Password Correct for ID: ", element.dataValues.userID);
          } else {
            //Alert incorrect password or redirect
            console.log("Incorrect Password");
          }
          // If password is right then send user
        } else {
          //Alert incorrect username
          console.log("Incorrect Username")
          // Username not in database
        }
      });
    });
  });

  // app.get("/createUser", function(req,res) {
  //   var userName = "testUser1";

  //   db.users.findAll({}).then(function(dbusers) {
  //     res.json(dbusers);
  //     dbusers.forEach(function(element) {
  //       if (userName == element.dataValues.username){
  //         //Alert User Already Exist
  //         console.log("User Already Exist")
  //       }
  //       else{
  //         app.post("/createUser", function(req, res) {
  //           db.users.create(req.body).then(function(dbusers) {
  //             res.json(dbusers);
  //           });
  //         });
  //       }
  //     });
  // });  

  app.post("/createUser", function(req, res){
    var flag = 0;
    console.log(req.body);
    db.users.findAll({}).then(function(dbusers) {
      res.json(dbusers);
      dbusers.forEach(function(element) {
        if (req.body.username === element.dataValues.username){
          //Alert User Already Exist
          console.log("User Already Exist")
          flag += 1;
        } else if (req.body.email === element.dataValues.email){
          console.log("Email Already Exists");
          flag += 1;
        } else if (req.body.handle === element.dataValues.handle){
          console.log("Handle Already Exists");
          flag += 1;
        } 
        // Password length?
      });

      if (flag === 0) {
        db.users.create({
          email: req.body.email,
          handle: `@${req.body.username}`,
          username: req.body.username,
          user_password: req.body.password
        });
      }
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
