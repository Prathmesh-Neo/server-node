const bcrypt = require('bcryptjs');
const User = require('../Models/userSchema');

const signUp = async (req, res) => {
    try {
        const { name, contact, password, email, role } = req.body;

        const missingFields = [];

        if (!name) missingFields.push('name');
        if (!contact) missingFields.push('contact');
        if (!password) missingFields.push('password');
        if (!email) missingFields.push('email');

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: 'Missing required fields',
                missing: missingFields
            });
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists', email })
        }
        const hashPass = await bcrypt.hash(password, 10)
        const user = await User.create({ name, contact, password: hashPass, email, role })
        return res.status(201).json({ message: "User created" });

    } catch (error) {
        return res.json(error.message)
    }
}



module.exports = { signUp }