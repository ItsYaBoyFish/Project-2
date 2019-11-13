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

  // app.get('/dashboard', (req, res) => {
  //   var data = {
  //     layout: 'dashboard',
  //   people: [
  //       {
  //         recipient_name: 'Austin',
  //         recipient_id: '1',
  //         user_id: '1'
  //       },
  //       {
  //         recipient_name: 'Joel',
  //         recipient_id: '2',
  //         user_id: '1'
  //       },
  //       {
  //         recipient_name: 'Scott',
  //         recipient_id: '3',
  //         user_id: '1'
  //       },
  //       {
  //         recipient_name: 'Max',
  //         recipient_id: '4',
  //         user_id: '1'
  //       },
  //       {
  //         recipient_name: 'test 1',
  //         recipient_id: '5',
  //         user_id: '1'
  //       },
  //       {
  //         recipient_name: 'test 2',
  //         recipient_id: '6',
  //         user_id: '1'
  //       },
  //       {
  //         recipient_name: 'test 3',
  //         recipient_id: '7',
  //         user_id: '1'
  //       },
  //       {
  //         recipient_name: 'test 4',
  //         recipient_id: '8',
  //         user_id: '1'
  //       }
  //     ]
  //   }
  //   res.render('dashboard', data);
  // });

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

    // console.log(req.body);
    
    // Flag Set
    var userFound = false;
    var userInfo;

    db.users.findAll({}).then(function(dbusers) {
      // res.json(dbusers);
      dbusers.forEach(function(element){
        if (req.body.username == element.dataValues.username){
          // console.log(element.dataValues.userID);
          // Username is in database, Now check password
          if(req.body.password === element.dataValues.user_password) {
            //Render Home Page with UserID (AUSTIN)
            console.log("Username and Password Correct for ID: ", element.dataValues.userID);
            userFound = true;
            userInfo = element;
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
        // console.log(`Iteration Value: ${userFound}`);
      });
      console.log(`Ending Value: ${userFound}`);
      if (userFound === true) {
        var ifData = {
          successful: true,
          message: 'Successfully Logged In',
          userInfo: userInfo
        }
        res.send(ifData);
      } else {
        var elseData = {
          successful: false,
          message: 'Username and Password are incorrect'
        }
        res.send(elseData);
      }
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

  app.post("/createUser", function(req, res) {
    var flag = 0;
    console.log(req.body);
    db.users.findAll({}).then(function(dbusers) {
      // res.json(dbusers);
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
        })
        // testing to see if i can get the same username information back.
        .then(function(response) {
          db.users.findAll({ where: {username: req.body.username}}).then(function(response) {
            console.log(response);
            res.send(response[0].dataValues);
          })
        });
      }
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
