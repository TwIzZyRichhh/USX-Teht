import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {selectUserByUsernameAndPassword} from '../models/user-model.js';

const postLogin = async (req, res) => {
  try {
    const user = await selectUserByUsernameAndPassword(req.body);
    if (!user) {
      return res.status(401).json({message: 'invalid username or password'});
    }
    const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '24h'});
    res.json({...user, token});
  } catch (err) {
    res.status(500).json({message: 'server error'});
  }
};

const getMe = (req, res) => {
  res.json({message: 'token ok', user: req.user});
};

export {postLogin, getMe};