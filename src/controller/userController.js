import userModel from "../database/model/userModel.js";
import { createToken } from "../utils/jwtAction.js";

export const register = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.name) {
            return res.status(500).json({
                message: 'Missing input parameter!'
            })
        }
        const findEmail = await userModel.findOne({ email: req.body.email });
        if (findEmail) {
            return res.status(500).json({
                message: 'Email already claimed!'
            })
        }
        const newUser = new userModel({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            role: 'student'
        })
        await newUser.save();

        return res.status(200).json({
            message: 'Register successful!'
        })
    } catch (e) {
        // console.log(e)
        return res.status(500).json(e.message);
    }
}

export const login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(500).json({
                message: 'Missing input parameter!'
            })
        }
        const findUser = await userModel.findOne({ email: req.body.email });
        if (!findUser) {
            return res.status(500).json({
                message: 'User does not exist!'
            })
        }
        if (findUser.password !== req.body.password) {
            return res.status(500).json({
                message: 'Password does not match!'
            })
        }

        let payload = {
            _id: findUser._id,
            email: findUser.email,
            role: findUser.role,
            expireIn: process.env.JWT_EXPIRE_IN
        }
        let token = createToken(payload)

        return res.status(200).json({
            message: 'Login successful',
            data: {
                access_token: token,
                userData: {
                    _id: findUser._id,
                    email: findUser.email,
                    role: findUser.role
                }

            }
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
}