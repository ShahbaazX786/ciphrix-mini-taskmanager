import jwt from 'jsonwebtoken';

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const getOTPExpiryTime = () => {
    return Date.now() + 5 * 60 * 1000;
}

const generateTokenAndSetCookie = async (_res, userId, temp = false) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: temp ? "5m" : "15m"
    });

    const expiresInMs = temp ? 5 * 60 * 1000 : 15 * 60 * 1000;

    // Commenting it out as deploying on vercel is stupid.
    // res.cookie("tm-token", token, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'none',
    //     maxAge: expiresInMs,
    //     path: '/'
    // });

    const tokenExpiry = Date.now() + expiresInMs;
    return { token, tokenExpiry };
}

const clearTokenInCookies = async (res) => {
    await res.clearCookie('tm-token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/'
    });
}

const clearTempTokenWithValidToken = async (res, userId) => {
    await clearTokenInCookies(res);
    const { token, tokenExpiry } = await generateTokenAndSetCookie(res, userId);
    return { token, tokenExpiry };
}

const getUserDetail = (user) => {
    const { fullName, email, role } = user;
    return { fullName, email, role }
}

export { clearTempTokenWithValidToken, clearTokenInCookies, generateOTP, generateTokenAndSetCookie, getOTPExpiryTime, getUserDetail };

