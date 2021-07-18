 const express = require("express");
 const router = express.Router();
 const auth = require("../config/auth")
 // Welcome Page
 router.get('/', (req, res) => res.render("welcome"));

  // Dashboard Page
  router.get('/dashboard', auth.ensureAuthenticated, (req, res) => res.render("dashboard", {
      user: req.user
  }));

 module.exports = router;