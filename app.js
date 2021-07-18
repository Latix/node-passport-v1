const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");

const app = express();

// Passport Config
require('./config/passport')(passport);
// DB Config
const db = require('./config/keys').MongoURI; 

const PORT = process.env.port || 5000;

//  Connect to mongo
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((res) => app.listen(PORT, () => console.log(`Server started in port ${PORT}`)))
.catch((err) => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

// const fs = require("fs");
// const path = require("path");

// require('./lib/email/send.js')({
//   from: '"Your Name" <kamsikodi@gmail.com>', // sender address
//   to: "kamsikodi@gmail.com", // list of receivers
//   subject: "Medium @edigleyssonsilva ✔", // Subject line
//   template: "email",
//   templateVars: {
//     username: "Chris"
//   },
//   attachments: [
//     {   // stream as an attachment
//       filename: 'file.txt',
//       content: fs.createReadStream(path.join(__dirname, "file.txt"))
//     },
//   ]
// });

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
