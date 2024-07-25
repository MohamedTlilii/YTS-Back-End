const User = require('../../models/User');
const crypto = require('crypto');
const mailer = require('../../utils/mailer');

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Check if the user with that email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Generate reset token
    const resetPasswordToken = crypto.randomBytes(32).toString('hex');

    // Save reset token and expiry in the database
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = Date.now() + 1800000; // Token expires in 30 minutes
    await user.save();

    // Send email with password reset link
    const resetURL = `http://localhost:3000/api/user/requestPasswordReset/${resetPasswordToken}`;
    await mailer.sendPasswordResetEmail(user.email, resetURL);

    res.status(200).json({ message: 'Password reset link sent to your email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

module.exports = forgotPassword;
