const { connectDb } = require('./db.js');
const bcrypt = require('bcrypt');
const { createSecretToken } = require('./jwtToken.js');

module.exports = {
    login: async (req, res) => {

        try {
            const { userName, password } = req.body;
            const dataBase = await connectDb(process.env.USER_TABLE);
            const user = await dataBase.findOne({ 'username': userName });

            if (user) {
                if (await bcrypt.compare(password, user.password)) {
                    const token = await createSecretToken(user.username);
                    res.cookie("token", token, {
                        withCredentials: true,
                        // httpOnly: true
                    })
                    res.status(201).send('success');
                }
                else
                    res.status(400).send(`Username and password don't match`)
            }
            else
                res.status(400).send(`User not found`)
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e.message)
        }
    }
}