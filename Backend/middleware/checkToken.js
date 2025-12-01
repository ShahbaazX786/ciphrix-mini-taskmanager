import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const checkToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) return res.status(401).json({ message: 'Unauthorized Access - No Valid Token was Found' });

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) return res.status(401).json({ success: false, message: 'Unauthorized Access - Invalid Token Found' })

        req.userId = decodedToken.userId;
        req.user = await User.findById(decodedToken.userId).select('-password');

        next();
    } catch (error) {
        console.log('Error in Verifying Token', error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}