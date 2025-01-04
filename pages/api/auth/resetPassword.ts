import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.body;

    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    // Token expires in 1 hour
    const resetTokenExpiry = Date.now() + 3600000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(resetTokenExpiry);

    await user.save();

    // Send email with the reset token
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset?token=${resetToken}`;

    const mailOptions = {
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of your account's password. Click the link to reset your password: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent' });
}
