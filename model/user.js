import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 8,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 255,
  },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;
