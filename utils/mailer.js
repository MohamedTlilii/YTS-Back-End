const nodemailer = require('nodemailer');
const ejs =require('ejs')
const transporter = nodemailer.createTransport({
  

    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    // debug: true // or debug: console.log

});

const sendPasswordResetEmail = async (email, resetURL) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        // text: `You have requested to reset your password. Please click the link below to reset your password:\n\n${resetURL}\n\nIf you did not request this, please ignore this email.`,
        html: `
                       <div style="align-items: center; max-width: 600px; margin: 0 auto; padding: 60px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); display: flex; flex-direction: column; gap: 10px;">
  <div>
    <image src="https://files.catbox.moe/sn7lfk.png" alt="YTS Logo" style="align-items: center; max-width: 150px; margin-bottom: 20px;">
  </div>
  <p style="font-size: 32px; font-weight: 500; letter-spacing: 0.01em; color: #6ac045;">PASSWORD RESET REQUEST</p>
  <p style="width: 280px; text-align: center; font-size: 17px; letter-spacing: 0.01em;">You have requested to reset your password. Please click the link below to reset your password:</p>
  <div style="margin: 20px 0;">
    <a href="${resetURL}" style="background-color: #6ac045; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
  </div>
  <p style="width: 280px; text-align: center; font-size: 17px; letter-spacing: 0.07em;">This link will expire in 1 hour. If you did not request a password change, please ignore this email.</p>
  <br>
  <p style="color: #6ac045;">THANK YOU</p>
</div>

        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent to:', email);
    } catch (error) {
        console.error('Error sending password reset email:', error.message, error.stack);
    }
};

module.exports = { sendPasswordResetEmail };
