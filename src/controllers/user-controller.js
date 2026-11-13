import {listAllUsers, findUserById} from '../models/user-model.js';

const getUsers = async (req, res) => {
  const result = await listAllUsers();
  if (result.error) {
    return res.status(500).json(result);
  }
  res.json(result);
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (!user) {
    return res.status(404).json({message: 'User not found'});
  }
  if (user.error) {
    return res.status(500).json(user);
  }
  res.json(user);
};

export {getUsers, getUserById};