const jwt = require('jsonwebtoken');
module.exports = {
    createSecretToken: async (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, {
            expiresIn: 15 * 24 * 60 * 60,
        })
    }
}