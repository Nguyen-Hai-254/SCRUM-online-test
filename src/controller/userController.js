import userModel from "../database/model/userModel.js";

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
        return res.status(200).json({
            message: 'Login successful',
            data: {
                id: findUser._id,
                email: findUser.email,
                role: findUser.role
            }
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
}

export const changeRole = async (req, res) => {
    try {
        if (!req.body.id || !req.body.role) {
            return res.status(400).json({
                message: 'Missing input parameter!'
            })
        }
        const findUser = await userModel.findById(req.body.id);
        if (!findUser) {
            return res.status(400).json({
                message: 'User does not exist!'
            })
        }
        findUser.role = req.body.role;
        await findUser.save();
        return res.status(200).json({
            message: 'Change role successful!'
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
}

export const allUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).json([
            ...users.map(user => ({
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }))
        ])
    } catch (e) {
        return res.status(500).json(e.message);
    }
}

export const changeName = async (req, res) => {
    try {
        if (!req.body.id || !req.body.name) {
            return res.status(400).json({
                message: 'Missing input parameter!'
            })
        }
        const findUser = await userModel.findById(req.body.id);
        if (!findUser) {
            return res.status(400).json({
                message: 'User does not exist!'
            })
        }
        findUser.name = req.body.name;
        await findUser.save();
        return res.status(200).json({
            message: 'Change user information successful!'
        })
    }
    catch {
        return res.status(500).json(e.message);
    }
}