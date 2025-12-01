import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import { clearTempTokenWithValidToken, clearTokenInCookies, generateOTP, generateTokenAndSetCookie, getOTPExpiryTime } from '../utils/helpers.js';

const SignUp = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!email || !password || !fullName) {
            throw new Error('All Fields are required');
        }
        const userAlreadyExists = await User.findOne({ email });

        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();
        const otpExpiryTime = getOTPExpiryTime();
        const user = new User({ fullName, email, password: hashedPassword, otp, otpExpiryTime });
        await user.save();

        generateTokenAndSetCookie(res, user._id, true);
        // await sendWelcomeEmail(fullName, email, otp);

        res.status(201).json({
            success: true, message: "User Created Sucessfully",
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


const SignIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error('Email and Password are required');
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid Email or User not Found" });
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password);

        if (!isPasswordMatching) {
            return res.status(404).json({ success: false, message: "Invalid Password" });
        }

        generateTokenAndSetCookie(res, req._id);
        return res.status(200).json({
            success: true, message: "User LoggedIn Sucessfully"
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const SignOut = async (_req, res) => {
    try {
        await clearTokenInCookies(res);
        return res.status(200).json({ success: true, message: "User Logged Out Sucessfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const VerifyOTP = async (req, res) => {
    const { otp } = req.body;
    if (!otp) {
        return res.status(404).json({ success: false, message: "Invalid email or OTP" });
    }

    try {
        const userExists = await User.findById({ _id: req.userId });
        if (!userExists) {
            return res.status(404).json({ success: false, message: `An account associated with ${email} is not found` });
        }

        if (otp !== userExists.otp || userExists.otpExpiryTime <= Date.now()) {
            return res.status(400).json({ success: false, message: "The OTP you entered is not Valid or Expired" });
        }

        await User.findByIdAndUpdate(userExists._id, { $set: { isVerified: true } })
        await clearTempTokenWithValidToken(res, userExists._id);
        return res.status(200).json({ success: true, message: "OTP Verified Sucessfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// Temporary methods added for debugging..
const getAllUsers = async (_req, res) => {
    try {
        const userList = await User.find({});
        if (!userList) {
            return res.status(404).json({ success: false, message: 'No Users Left' });
        }
        return res.status(200).json({ success: true, length: userList.length, userList });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.find({ _id: id });
        if (!user) {
            return res.status(404).json({ success: false, message: `An account associated with ${id} is not found` });
        }
        return res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const RefreshToken = async (req, res) => {
    try {
        await generateTokenAndSetCookie(res, req.userId);
        return res.status(200).json({ success: true, message: 'A new token is generated' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

export { getAllUsers, getUser, RefreshToken, SignIn, SignOut, SignUp, VerifyOTP };