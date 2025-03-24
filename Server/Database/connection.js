import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const connectionURL = process.env.ATLAS_CONNECTION_STRING;
    await mongoose.connect(connectionURL);
    console.log("MongoDB Connected -", mongoose.connection.db.databaseName);
  } catch (err) {
    console.error(err);
  }
};

export default connectToDb;
