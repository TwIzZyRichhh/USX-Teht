import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {selectUserByUsernameAndPassword} from '../models/user-model.js';

/**
 * POST /api/auth/login
 * Checks credentials and returns the user info with a JWT
 */
const postLogin = async (req, res) => {
  try {
    const user = await selectUserByUsernameAndPassword(req.body);
    if (!user) {
      return res.status(401).json({message: 'invalid username or password'});
    }
    const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '24h'});
    res.json({...user, token});
  } catch (err) {
    console.error('postLogin', err);
    res.status(500).json({message: 'server error'});
  }
};

/**
 * GET /api/auth/me
 * Returns the user decoded from the token (set by authenticateToken)
 */
const getMe = (req, res) => {
  if (req.user) {
    res.json({message: 'token ok', user: req.user});
  } else {
    res.sendStatus(401);
  }
};

export {postLogin, getMe};