import jwt from 'jsonwebtoken';

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const getOTPExpiryTime = () => {
    return Date.now() + 5 * 60 * 1000;
}

const generateTokenAndSetCookie = async (res, userId, temp = false) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: temp ? "5m" : "15m"
    });

    const expiresInMs = temp ? 5 * 60 * 1000 : 15 * 60 * 1000;

    res.cookie("tm-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: expiresInMs,
        path: '/'
    });

    return token;
}

const clearTokenInCookies = async (res) => {
    await res.clearCookie('tm-token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        path: '/'
    });
}

const clearTempTokenWithValidToken = async (res, userId) => {
    await clearTokenInCookies(res);
    await generateTokenAndSetCookie(res, userId);
}

export { clearTempTokenWithValidToken, clearTokenInCookies, generateOTP, generateTokenAndSetCookie, getOTPExpiryTime };

