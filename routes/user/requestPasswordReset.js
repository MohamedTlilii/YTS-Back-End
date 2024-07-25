

// const path = require('path');
const User = require('../../models/User'); // Adjust the path according to your project structure
const crypto = require('crypto');
const bcrypt = require("bcrypt");

const requestPasswordReset = async (req, res) => {
    try {
        // Extract the token from the URL params
        const token = req.params.token;
        // console.log(token);
        // Assuming you are using body-parser or similar middleware to parse JSON bodies
        const { newPassword, confirmNewPassword } = req.body;

        // Check if newPassword and confirmNewPassword are provided and match
        if (!newPassword || !confirmNewPassword || newPassword !== confirmNewPassword) {
            return res.status(400).json({ error: "New password and confirm password do not match" });
        }

        let validatePassword = newPassword.match(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/
        );

        if (!validatePassword) {
            return res.status(400).json({
                status: false,
                message: "Password must contain at least a minimum length of 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character",
            });
        }

        // Find the user by the reset password token
        const user = await User.findOne({ resetPasswordToken: token });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }



        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const resetPasswordToken = crypto.randomBytes(32).toString('hex');

        // Update the user's password
        user.password = hashedPassword; // Ensure you hash the password before saving
        user.resetPasswordToken = resetPasswordToken; // Remove the token after successful reset
        await user.save();

        res.status(200).json({ message: "Password has been successfully reset" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while resetting the password" });
        console.log(error);
    }
};

module.exports = requestPasswordReset;
