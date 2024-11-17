const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const handlebars = require('handlebars');

async function sendWelcomeEmail(userEmail, userName, verificationToken) {
    // Read email template
    const emailTemplate = await fs.readFile('../email/welcome-email.html', 'utf-8');
    
    // Compile template
    const template = handlebars.compile(emailTemplate);
    
    // Create verification link
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    // Log verification link for debugging
    console.log('Verification link:', verificationLink);
    
    // Replace variables in template
    const htmlContent = template({
        userName: userName,
        verificationLink: verificationLink
    });

    // Configure email transport
    const transporter = nodemailer.createTransport({
        // Your email service configuration
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Send email
    await transporter.sendMail({
        from: '"Legal Forage" <noreply@legalforage.com>',
        to: userEmail,
        subject: 'Welcome to Legal Forage - Please Verify Your Email',
        html: htmlContent
    });
}

module.exports = { sendWelcomeEmail }; 