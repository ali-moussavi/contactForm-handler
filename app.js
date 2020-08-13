const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send', (req, res) => {
	const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'personalportfolio01@gmail.com',
			pass: 'sKnkfxM7MG86'
		}
	});

	// setup email data with unicode symbols
	let mailOptions = {
		from: 'personalportfolio01@gmail.com', // sender address
		to: 'ma.moussavi73@gmail.com', // list of receivers
		subject: 'Ali Moussavi Portfolio Contact', // Subject line
		html: output // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return res.status(400).json(error);
		} else {
			console.log(info);
			return res.json(info);
		}
	});
});

app.listen(process.env.PORT || 3000, () => {
	console.log('app is running on port 3000');
});
