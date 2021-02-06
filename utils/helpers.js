import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const generateHash = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt);
}

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'secret', (err, user) => {
            if (err) {
                return res.status(403).json({ msg: 'Forbidden' });
            }

            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ msg: 'Unauthorized' });
    }
};