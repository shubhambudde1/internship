const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail', 'yahoo', 'outlook', etc.
  auth: {
    user: 'shubhambudde55@gmail.com', // Replace with your email
    pass: 'nbzo rqoj eknd pjus'   // Replace with your email password or app password
  }
});

// Email options
const mailOptions = {
  from: 'shubhambudde55@gmail.com', // Sender's email address
  to: 'shubhambudde27@gmail.com', // Receiver's email address
  subject: 'Hello from Nodemailer!', // Email subject
  text: 'This is a plain text email.', // Plain text body
  html: '<h1>Hello!</h1><p>This is a test email sent using <b>nodemailer</b>.</p>' // HTML body (optional)
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error:', error);
  }
  console.log('Email sent successfully:', info.response);
});
