const { ObjectId } = require('mongodb');
const { connectDb } = require('./db.js')

module.exports = {
    create: async (req, res) => {
        try {
            const { title, body, user } = req.body;
            // const userId = new ObjectId('65bdee8e730751c2d2ac8db8');
            const dataBase = await connectDb(process.env.POST_TABLE);
            const userDataBase = await connectDb(process.env.USER_TABLE);
            const userInfo = await userDataBase.findOne({ username: user });
            const userId = userInfo._id;
            console.log(user);
            console.log(userInfo);

            const { insertedId } = await dataBase.insertOne({
                title,
                body,
                userId,
                user,
            })

            userDataBase.updateOne({ _id: userId }, {
                $push: {
                    'postIDs': insertedId,
                }
            })
            console.log('postIDs' + insertedId);
            res.status(201).send({ message: 'success' })
        }
        catch (e) {
            console.log(e);
            res.status(400).send({ message: e.message })
        }
    }
}