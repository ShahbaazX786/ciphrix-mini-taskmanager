import jwt from 'jsonwebtoken';

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const getOTPExpiryTime = () => {
    return Date.now() + 5 * 60 * 1000;
}

const generateTokenAndSetCookie = async (res, userId, temp = false) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: temp ? "5m" : "7d"
    });

    const expiresInMs = temp ? 5 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: expiresInMs
    });

    return token;
}

export { generateOTP, getOTPExpiryTime, generateTokenAndSetCookie };

