const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const { htmlToText } = require("html-to-text");
const juice = require("juice");
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

module.exports = ({ template: templateName, templateVars, ...restOfOptions }) => {
    const templatePath = `lib/email/templates/${templateName}.html`;
    
    const options = {
        ...restOfOptions,
    };

    if (templateName && fs.existsSync(templatePath)) {
        const template = fs.readFileSync(templatePath, "utf-8");
        
        const html = ejs.render(template, templateVars);
        const text = htmlToText(html);
        const htmlWithStylesInlined = juice(html);
    
        options.html = htmlWithStylesInlined;
        options.text = text;
      }
    
      return transporter.sendMail(options).then(info => {
            console.log({info});
        }).catch(console.error);
}
