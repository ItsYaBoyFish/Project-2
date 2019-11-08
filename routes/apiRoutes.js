var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.get("/api/gifts", function(req, res) {
    console.log("hey butt face");
    db.Gift.findAll({}).then(function(dbGift) {
      res.json(dbGift);
    });
  });

  app.get("/api/gifts/:id", function(req, res) {
    db.Gift.findAll({
      where: {
        recipientID: req.params.id
      }
    }).then(function(dbGift) {
      res.json(dbGift);
    });
  });
};
