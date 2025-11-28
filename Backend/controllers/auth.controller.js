import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";

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
        const user = new User({ fullName, email, password: hashedPassword });
        await user.save();

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

        return res.status(200).json({
            success: true, message: "User LoggedIn Sucessfully"
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export { SignUp, SignIn };
