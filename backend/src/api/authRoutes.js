import express from 'express';
import User from '../models/user.model';
const router = express.Router();
export const register = async (req, res) => {
  const user = new User(req.body);
  try {
    user.setPassword(req.body.password);
    await user.save();
    const token = await user.generateJWT();
    user.hash = undefined;
    user.salt = undefined;
    res.status(201).send({ message: 'User created successfully', user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.validPassword(password)) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    const token = await user.generateJWT();
    res.set('Authorization', `Token ${token}`);
    user.hash = undefined;
    user.salt = undefined;
    res.json({ user, token });
  } catch (error) {
    res.status(400).send();
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie('token');
    res.send({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).send();
  }
};
