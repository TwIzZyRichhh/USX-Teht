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
const addUser = async ({username, password, email}) => {
  try {
    // user_level_id 2 = 'User' in your UserLevels table
    const [result] = await promisePool.execute(
      'INSERT INTO Users (username, password, email, user_level_id) VALUES (?, ?, ?, 2)',
      [username, password, email],
    );
    return {user_id: result.insertId};
  } catch (e) {
    console.error('addUser error:', e.message);
    return {error: e.message, code: e.code};
  }
};

const updateUser = async (id, {username, email}) => {
  try {
    const [result] = await promisePool.execute(
      'UPDATE Users SET username = ?, email = ? WHERE user_id = ?',
      [username, email, id],
    );
    return {affectedRows: result.affectedRows};
  } catch (e) {
    console.error('updateUser error:', e.message);
    return {error: e.message, code: e.code};
  }
};
const removeUser = async (id) => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. things the user did on any media
    await connection.execute('DELETE FROM Comments WHERE user_id = ?', [id]);
    await connection.execute('DELETE FROM Likes WHERE user_id = ?', [id]);
    await connection.execute('DELETE FROM Ratings WHERE user_id = ?', [id]);

    // 2. things attached to the user's own media items
    const ownMedia = '(SELECT media_id FROM MediaItems WHERE user_id = ?)';
    await connection.execute(`DELETE FROM Comments WHERE media_id IN ${ownMedia}`, [id]);
    await connection.execute(`DELETE FROM Likes WHERE media_id IN ${ownMedia}`, [id]);
    await connection.execute(`DELETE FROM Ratings WHERE media_id IN ${ownMedia}`, [id]);
    await connection.execute(`DELETE FROM MediaItemTags WHERE media_id IN ${ownMedia}`, [id]);

    // 3. the user's media items
    await connection.execute('DELETE FROM MediaItems WHERE user_id = ?', [id]);

    // 4. the user
    const [result] = await connection.execute(
      'DELETE FROM Users WHERE user_id = ?',
      [id],
    );

    await connection.commit();
    return {affectedRows: result.affectedRows};
  } catch (e) {
    await connection.rollback();
    console.error('removeUser error:', e.message);
    return {error: e.message};
  } finally {
    connection.release();
  }
};

export {listAllUsers, findUserById, addUser, updateUser, removeUser};