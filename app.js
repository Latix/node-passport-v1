const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

require('./lib/email/send.js')({
  from: '"Your Name" <kamsikodi@gmail.com>', // sender address
  to: "kamsikodi@gmail.com", // list of receivers
  subject: "Medium @edigleyssonsilva ✔", // Subject line
  template: "email",
  templateVars: {
    username: "Chris"
  },
  attachments: [
    {   // stream as an attachment
      filename: 'file.txt',
      content: fs.createReadStream(path.join(__dirname, "file.txt"))
    },
  ]
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/index'));

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server started in port ${PORT}`));
