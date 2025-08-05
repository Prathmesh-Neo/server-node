const  User  = require('../Models/userSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        const isUser = await User.findOne({ email });
        if (!isUser) {
            return res.status(404).json({ message: 'User not Exists' })
        }

        const isPasswordValid = await bcrypt.compare(password, isUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = {
            name: isUser.name,
            role: isUser.role,
            email: isUser.email
        }
        const token = jwt.sign(user, process.env.JWT_SECREAT, { expiresIn: '2d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV,
            sameSite: 'Strict',
            maxAge: 2 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ message: 'Login successful', user })


    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { login }