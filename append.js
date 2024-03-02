const { ObjectId } = require('mongodb');
const { connectDb } = require('./db.js')

module.exports = {
    appendPost: async (req, res) => {

        try {
            const { id } = req.params;
            const { body } = req.body;
            const dataBase = await connectDb(process.env.POST_TABLE);
            const post = await dataBase.findOneAndUpdate(
                { '_id': new ObjectId(id) },
                [{ $set: { 'body': { '$concat': ['$body', ' ' + body] } } }]
            )
            res.status(201).send('Contents added successfully');
        } catch (e) {
            console.log(e.message);
            res.status(400).send(e.message);
        }
    }
}