const jwt = require('jsonwebtoken');
const { connectDb } = require('./db.js');

module.exports = {
    userVerification: async (req, res) => {
        try {
            const { token } = req?.body;
            if (!token) {
                console.log('no token present');
                return res.json({ message: 'no token present', status: false })
            }
            jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (err, data) => {
                if (err) return res.json({ status: false })
                const dataBase = await connectDb(process.env.USER_TABLE);
                const user = await dataBase.findOne({ 'username': data.id });
                if (user)
                    return res.json({ status: true, user: user.username })
                return res.json({ status: false })
            })
        }
        catch (e) {
            console.log(e);
            return res.json({ status: false })
        }
    }
}