var db = require("../models");

module.exports = function(app) {
  app.get("/api/gifts", function(req, res) {
    db.Gift.findAll({}).then(function(dbGift) {
      res.send(dbGift);
    });
  });

  app.get("/api/gifts/:id", function(req, res) {
    db.Gift.findAll({
      where: {
        recipientID: req.params.id
      }
    }).then(function(result) {
      // Setting up the holder arrays
      var purchased = [];
      var notPurchased = [];
      // Take the results given and loop through them to determine if they are purchased or not.
      for (var i = 0; i < result.length; i++) {
        if (result[i].purchased === true) {
          purchased.push(result[i]);
        } else {
          notPurchased.push(result[i]);
        };
      } 
      // Packaging the info for delivery to UI
      var data = {
        layout: 'gift',
        giftsPurchased: purchased,
        giftsNotPurchased: notPurchased
      }
      // Sending the info to the client
      res.render('gifts', data);
    });
  });

  app.delete("/api/gifts/:id", function(req, res) {
    db.Gift.destroy({
      where: {
        giftID: req.params.id
      }
    }).then(function(dbGift) {
      res.json(dbGift);
    });
  });

  app.put("/api/gifts/:id", function(req, res) {
    db.Gift.findAll({
      where: {giftID: req.params.id}
    }).then(function(response) {
      var purchased = response[0].dataValues.purchased;

      if (purchased === false) {
        // If the purchased value is false, set it true. 
        db.Gift.update(
          { purchased: 1},
          { where: { giftID: req.params.id } }
        ).then(function(dbGift) {
          res.send(dbGift);
        });
      } else {
        db.Gift.update(
          { purchased: 0},
          { where: { giftID: req.params.id } }
        ).then(function(dbGift) {
          res.send(dbGift);
        });
      }
    });
    
    
    
    // db.Gift.update(
    //   { purchased: 1},
    //   { where: { giftID: req.params.id } }
    // ).then(function(dbGift) {
    //   res.json(dbGift);
    // });
  });

  app.post("/api/gifts", function(req, res) {
    console.log(req.body);
    db.Gift.create(req.body).then(function(dbGift) {
      res.json(dbGift);
    });
  });



  app.get("/api/recip/:id", function(req,res){
    var id = req.params.id;
    // console.log(dbRecipient);
    db.Recipient.findAll({
      where: {userID: id}
    })
    .then(function(dbRecipient) {
      var data = {
        layout: 'dashboard',
        userID: id,
        recips: dbRecipient
      }

      res.render('dashboard', data)
      //  res.send(dbRecipient);
     })
})

app.delete("/api/recip/:id", function(req,res){
    db.Recipient.destroy({
        where: {
            recipientID: req.params.id
        }
    }).then(function(dbRecipient){
      var data = {
        layout: 'dashboard',
        recips: dbRecipient
      }

      res.render('dashboard', data)
        // res.json(dbRecipient);
    })
})

app.post("/api/recip", function(req, res) {
  // console.log("POST")
  db.Recipient.create({recipient_name: req.body.name, userID: req.body.userId}).then(function(result) {
    res.send(result);
  })
})
};
