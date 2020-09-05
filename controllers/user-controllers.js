import User from '../model/user';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
  const userExists = await User.findOne({name: req.body.name});
  if (userExists) return res.status(400).send('Username already exists');

  const emailExists = await User.findOne({email: req.body.email});
  if (emailExists) return res.status(400).send('Email already exists');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const saveUser = await user.save();
    res.json(saveUser);
  } catch (err) {
    res.json({message: err});
  }
};

const loginUser = async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Email or password is incorrect');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Email or password is incorrect');

  // const token = jwt.sign({_id: user._id});
};

export {registerUser, loginUser};
