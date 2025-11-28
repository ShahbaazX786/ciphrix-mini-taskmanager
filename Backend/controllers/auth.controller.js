import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const SignUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error('All Fields are required');
        }
        const userAlreadyExists = await User.findOne({ email });

        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({
            success: true, message: "User Created Sucessfully",
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}