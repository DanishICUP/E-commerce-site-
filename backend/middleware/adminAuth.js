import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: 'Not Authorized, please login again' }); 
        }

        // Decode token and match with email and password with env
        const decode_token = jwt.verify(token, process.env.JWT_SECRET);
        if (decode_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Not Authorized, please login again' }); 
        }

        next(); // Only call next if everything is fine
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message }); // Use return here
    }
}

export default adminAuth;
