import express from 'express';
import {
  getAllCardsHandler,
  getCardByIdHandler,
  createCardHandler,
  updateCardHandler,
  deleteCardHandler,
} from '../controllers/cardController.js';

import {
  validateId,
  validateCreateCard,
  validateUpdateCard,
  validateCardQuery,
} from '../middleware/cardValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';

const router = express.Router();
router.get('/', validateCardQuery, getAllCardsHandler);
router.get('/:id', validateId, getCardByIdHandler);
router.post('/', authenticate, authorizeAdmin, validateCreateCard, createCardHandler);
router.put(
  '/:id',
  authenticate,
  validateId,
  authorizeAdmin,
  validateUpdateCard,
  updateCardHandler,
);
router.delete(
  '/:id',
  authenticate,
  validateId,
  authorizeAdmin,
  deleteCardHandler,
);

export default router;
