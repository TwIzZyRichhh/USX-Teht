import express from 'express';
import {
  getMedia,
  getMediaById,
  putMedia,
  deleteMedia,
} from '../controllers/media-controller.js';

const mediaRouter = express.Router();

mediaRouter.route('/').get(getMedia);
mediaRouter.route('/:id').get(getMediaById);
mediaRouter.route('/:id').get(getMediaById).put(putMedia);
mediaRouter.route('/:id').get(getMediaById).put(putMedia).delete(deleteMedia);

export default mediaRouter;