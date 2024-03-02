const dbName = process.env.DB_NAME;
const { MongoClient } = require('mongodb');

const dbPassword = process.env.DB_PASSWORD;
const uri = `mongodb+srv://ap:${dbPassword}@cluster0.axaeneb.mongodb.net/?retryWrites=true&w=majority`;
const db = new MongoClient(uri);

module.exports = {

    connectDb: async (table) => {

        try {
            await db.connect();
            const dataBase = db.db(dbName);
            const collection = dataBase.collection(table);
            return collection;
        }
        catch (e) {
            console.log('Error is: ', e);
        }
    }
}