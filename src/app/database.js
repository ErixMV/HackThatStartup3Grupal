import mongoose from "mongoose";

export const createConnection = async () => {
    const { DB_URI } = process.env;
    const dbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    };

    if (DB_URI)
        mongoose.connect(DB_URI, dbOptions);

    const connection = mongoose.connection;

    connection.once('open', () => {
        if (process.env.ENV !== 'test')
            console.log("MongoDB connection stablished")
    });


    connection.on('error', err => {
        console.log(err);
        process.exit(0);
    });

    return connection;
}

export const cleanDataBase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}

export const closeConnection = async () => {
    // await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
}

const { ENV } = process.env;
if (ENV !== 'test')
    createConnection();


