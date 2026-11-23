import {
  listAllMedia,
  findMediaById,
  updateMedia,
  removeMedia,
} from '../models/media-model.js';

const getMedia = async (req, res) => {
  const result = await listAllMedia();
  if (result.error) {
    return res.status(500).json(result);
  }
  res.json(result);
};

const getMediaById = async (req, res) => {
  const media = await findMediaById(req.params.id);
  if (!media) {
    return res.status(404).json({message: 'Media item not found'});
  }
  if (media.error) {
    return res.status(500).json(media);
  }
  res.json(media);
};

// only the owner can update
const putMedia = async (req, res) => {
  const {title, description} = req.body || {};
  if (!title) {
    return res.status(400).json({message: 'Title is required'});
  }
  const result = await updateMedia(
    req.params.id,
    {title, description},
    req.user, // decoded from the token by authenticateToken
  );
  if (result.error) {
    return res.status(500).json(result);
  }
  if (result.affectedRows === 0) {
    return res
      .status(404)
      .json({message: 'Media item not found or you are not the owner'});
  }
  res.json({message: 'Media item updated'});
};

// only the owner can delete
const deleteMedia = async (req, res) => {
  const result = await removeMedia(req.params.id, req.user);
  if (result.error) {
    return res.status(500).json(result);
  }
  if (result.affectedRows === 0) {
    return res
      .status(404)
      .json({message: 'Media item not found or you are not the owner'});
  }
  res.json({message: 'Media item deleted'});
};

export {getMedia, getMediaById, putMedia, deleteMedia};