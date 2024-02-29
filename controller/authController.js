const db = require('../model')
const authModel = db.authModel
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

JWT_SECRET_KEY = "dhsjf3423jhsdf3423df"

const authRegister = async (req, res) => {
    try {
        const { adminName, email, password, confirm_password} = req.body;
        if (!adminName) { res.json({ status: false, message: 'Name required' }); }
        else if (!email) { res.json({ status: false, message: 'Email required' }); }
        else if (!password) { res.json({ status: false, message: 'Password required' }); }
        else if (!confirm_password) { res.json({ status: false, message: 'Confirm password required' }); }
        else {
            const isEmail = await authModel.count({ email });
            if (isEmail) {
                res.json({ status: false, message: 'Email already exists' });
            } else {
                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);
                await authModel.create({
                    adminName,
                    email,
                    password: hashedPassword,
                    confirm_password,
                });

                // Generate token
                const token = jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: '1h' });
                res.json({ status: true, message: 'Data recorded successfully...', token: token });
                console.log(token)
            }
        }
    } catch (err) {
        res.json({ status: false, message: err.message });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        try {
            const auths = await authModel.findOne({ email: email });
            if (auths !== null) {
                const passwordMatch = await bcrypt.compare(password, auths.password);
                if (passwordMatch) {
                    const token = jwt.sign({ email: auths.email }, JWT_SECRET_KEY , { expiresIn: '1h' });
                    res.send({ status: true, token: token });
                } else {
                    res.send({ status: false, message: "Incorrect password" });
                }
            } else {
                res.send({ status: false, message: "User does not exist" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.send({ status: false, message: "All fields are required" });
    }
};


module.exports = {
    authRegister,
    userLogin,
}

