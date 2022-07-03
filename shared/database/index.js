const { MongoClient, ObjectId } = require("mongodb");
const { env } = require("../env");

const MONGODB_URI = env.getString("MONGODB_URI", "");
const DATABASE_NAME = env.getString("DATABASE_NAME", "");

const client = new MongoClient(MONGODB_URI);

const getConnection = async () => {
    try {
        await client.connect();
        const database = client.db(DATABASE_NAME);

        return database;
    } catch (error) {
        throw error;
    }
}

const getCollection = async (name) => {
    try {
        const database = await getConnection();
        const collection = await database.collection(name);
        return collection;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    database: {
        collection: (name) => {
            return {
                create: async (body = {}) => {
                    var id = new ObjectId();
                    body = {
                        id: id,
                        _id: id,
                        ...JSON.parse(body)
                    };

                    try {
                        const collection = await getCollection(name);
                        const element = await collection.insertOne(body);

                        return body;
                    } catch (error) {
                        throw error;
                    }
                },
                find: async (query = {}) => {
                    query = JSON.parse(query);

                    try {
                        const collection = await getCollection(name);
                        const elements = await collection.find(query);

                        return await (await elements.toArray()).map(
                            element => {
                                return {
                                    id: element._id,
                                    ...element
                                };
                            }
                        );
                    } catch (error) {
                        throw error;
                    }
                },
                findOne: async (id = '') => {
                    try {
                        const collection = await getCollection(name);
                        const element = await collection.findOne({ id });
                        return {
                            id: element._id,
                            ...element
                        };
                    } catch (error) {
                        throw error;
                    }
                },
                update: async (id = '', body = {}) => {
                    body = JSON.parse(body);

                    try {
                        const collection = await getCollection(name);
                        const element = await collection.updateOne({ id }, body);

                        return element;
                    } catch (error) {
                        throw error;
                    }
                },
                delete: async (id = '') => {
                    try {
                        const collection = await getCollection(name);
                        const element = await collection.deleteOne({ id: new ObjectId(id) });

                        return element;
                    } catch (error) {
                        throw error;
                    }
                }
            };
        }
    }
};