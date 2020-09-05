import mongoose from 'mongoose';
import 'dotenv/config';

const connectToMongoDB = async () => {
  const uri = process.env.DB_CONNECTION;
  try {
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Connected to database');
  } catch (err) {
    console.log(err);
  }
};

export default connectToMongoDB;
