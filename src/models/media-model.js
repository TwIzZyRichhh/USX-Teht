import promisePool from '../utils/database.js';

const listAllMedia = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM MediaItems');
    return rows;
  } catch (e) {
    console.error('listAllMedia error:', e.message);
    return {error: e.message};
  }
};
const findMediaById = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM MediaItems WHERE media_id = ?',
      [id],
    );
    return rows[0];
  } catch (e) {
    console.error('findMediaById error:', e.message);
    return {error: e.message};
  }
};
const updateMedia = async (id, {title, description}) => {
  try {
    const [result] = await promisePool.execute(
      'UPDATE MediaItems SET title = ?, description = ? WHERE media_id = ?',
      [title, description, id],
    );
    return {affectedRows: result.affectedRows};
  } catch (e) {
    console.error('updateMedia error:', e.message);
    return {error: e.message};
  }
};
const removeMedia = async (id) => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();

    // delete rows that reference this media item first
    await connection.execute('DELETE FROM Comments WHERE media_id = ?', [id]);
    await connection.execute('DELETE FROM Likes WHERE media_id = ?', [id]);
    await connection.execute('DELETE FROM Ratings WHERE media_id = ?', [id]);
    await connection.execute('DELETE FROM MediaItemTags WHERE media_id = ?', [id]);

    // now the media item itself
    const [result] = await connection.execute(
      'DELETE FROM MediaItems WHERE media_id = ?',
      [id],
    );

    await connection.commit();
    return {affectedRows: result.affectedRows};
  } catch (e) {
    await connection.rollback();
    console.error('removeMedia error:', e.message);
    return {error: e.message};
  } finally {
    connection.release();
  }
};

export {listAllMedia, findMediaById, updateMedia, removeMedia};