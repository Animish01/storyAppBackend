const { connectDb } = require('./db.js')
const bcrypt = require('bcrypt')
const { createSecretToken } = require('./jwtToken.js');

module.exports = {
    signup: async (req, res) => {

        const { username: userName, email, password } = req.body;
        try {
            const hashPw = await bcrypt.hash(password, 10);
            const dataBase = await connectDb(process.env.USER_TABLE);

            if (await dataBase.findOne({ 'username': userName })) {
                res.status(400).send(`user ${userName} already exists`);
                return;
            }
            if (await dataBase.findOne({ 'email': email })) {
                res.status(400).send(`email ${email} already exists`);
                return;
            }
            if (!userName || !email || !password) {
                res.status(400).send('Enter all credentials');
                return;
            }

            const user = await dataBase.insertOne({
                'username': userName,
                'password': hashPw,
                'email': email,
            })
            console.log(userName + ' inserted');

            const token = await createSecretToken(user.username);
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: true
            })
            res.status(201).send('success');
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e.message);
        }
    }
}