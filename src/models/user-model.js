import promisePool from '../utils/database.js';

const listAllUsers = async () => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, user_level_id, created_at FROM Users',
    );
    return rows;
  } catch (e) {
    console.error('listAllUsers error:', e.message);
    return {error: e.message};
  }
};

const findUserById = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT user_id, username, email, user_level_id, created_at FROM Users WHERE user_id = ?',
      [id],
    );
    return rows[0];
  } catch (e) {
    console.error('findUserById error:', e.message);
    return {error: e.message};
  }
};

export {listAllUsers, findUserById};