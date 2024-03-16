import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js'

const protect = expressAsyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
           
            req.user = await User.findById(decoded.userId).select('-password')
           
            next()
        } catch (error) {
            return res.status(401)
            throw new Error("Unauthorized access- INVALID TOKEN")

        }
    } else {
        return res.status(401);
        throw new Error("Unauthorized access- NO TOKEN")
    }
})
const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        jwt.verify(
            token,
            process.env.JWT_SECRET || 'somethingsecret',
            (err, decode) => {
                if (err) {
                    return res.status(401).send({ message: 'NOT AUTHORIZED !!!' });
                } else {
                    req.user = decode;
                    next();
                }
            }
        );
    } else {
        return res.status(401).send({ message: 'NOT AUTHORIZED !!!' });
    }
};

export { protect, isAuth }


