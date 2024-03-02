const { ObjectId } = require('mongodb');
const { connectDb } = require('./db')

module.exports = {
    fetchPosts: async (req, res) => {
        try {
            const dataBase = await connectDb(process.env.POST_TABLE);
            const posts = await dataBase.find().toArray();
            res.status(201).send(posts);
        } catch (e) {
            res.status(400).send({ message: e.message });
        }
    },
    fetchOnePost: async (req, res) => {
        try {
            const dataBase = await connectDb(process.env.POST_TABLE);
            const post = await dataBase.findOne({
                _id: new ObjectId(req.params.id),
            });
            res.status(201).send(post);
        } catch (e) {
            res.status(400).send(e.message);
        }
    },
}