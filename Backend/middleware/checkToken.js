import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const checkToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized Access - No Token Provided' });
        }

        const token = authHeader.split(' ')[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).json({ message: 'Unauthorized Access - Invalid Token' });
        }

        req.userId = decodedToken.userId;
        req.user = await User.findById(decodedToken.userId).select('-password');

        next();
    } catch (error) {
        console.error('Error in verifying token', error);
        return res.status(401).json({ message: 'Unauthorized Access - Token Verification Failed' });
    }
};
