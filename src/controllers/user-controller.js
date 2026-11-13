import {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  removeUser,
} from '../models/user-model.js';

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
const postUser = async (req, res) => {
  const {username, password, email} = req.body || {};
  if (!username || !password || !email) {
    return res.status(400).json({message: 'Missing required fields'});
  }
  const result = await addUser({username, password, email});
  if (result.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({message: 'Username or email already in use'});
  }
  if (result.error) {
    return res.status(500).json(result);
  }
  res.status(201).json({message: 'New user added', user_id: result.user_id});
};

const putUser = async (req, res) => {
  const {username, email} = req.body || {};
  if (!username || !email) {
    return res.status(400).json({message: 'Username and email are required'});
  }
  const result = await updateUser(req.params.id, {username, email});
  if (result.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({message: 'Username or email already in use'});
  }
  if (result.error) {
    return res.status(500).json(result);
  }
  if (result.affectedRows === 0) {
    return res.status(404).json({message: 'User not found'});
  }
  res.json({message: 'User updated'});
};
const deleteUser = async (req, res) => {
  const result = await removeUser(req.params.id);
  if (result.error) {
    return res.status(500).json(result);
  }
  if (result.affectedRows === 0) {
    return res.status(404).json({message: 'User not found'});
  }
  res.json({message: 'User deleted'});
};

export {getUsers, getUserById, postUser, putUser, deleteUser};