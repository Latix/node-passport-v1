const express = require("express");
const fs = require("fs");
const app = express();

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'kamsikodi@gmail.com',
    pass: 'pvncckgtseldnigy',
  },
});
// transporter.verify().then(() => console.log("Crood")).catch(console.error);

let htmlstream = fs.createReadStream("email.html");

transporter.sendMail({
    from: '"Your Name" <kamsikodi@gmail.com>', // sender address
    to: "kamsikodi@gmail.com", // list of receivers
    subject: "Medium @edigleyssonsilva ✔", // Subject line
    html: htmlstream, // html body
  }).then(info => {
    console.log({info});
  }).catch(console.error);

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/index'));

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server started in port ${PORT}`));
