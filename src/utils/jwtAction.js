import dotenv from 'dotenv';
import jwt from "jsonwebtoken"

dotenv.config();

export const createToken = (payload) => {
    let key = process.env.JWT_SECRET
    let token = null
    try {
        token = jwt.sign(payload, key);
    } catch (e) {
        console.log(e)
    }

    return token
}