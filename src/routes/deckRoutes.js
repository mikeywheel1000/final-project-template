import express from 'express';
import {
  getAllDecksHandler,
  getDeckByIdHandler,
  createDeckHandler,
  updateDeckHandler,
  deleteDeckHandler,
  insertCardsHandler,
  removeCardsHandler
} from '../controllers/deckController.js';

import {
  validateId,
  validateCreateDeck,
  validateUpdateDeck,
  validateDeckQuery,
  validateCardList
} from '../middleware/deckValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();
router.get('/', validateDeckQuery, getAllDecksHandler);
router.get('/:id', validateId, getDeckByIdHandler);
router.post('/', authenticate, validateCreateDeck, createDeckHandler);
router.put(
  '/:id',
  authenticate,
  validateId,
  authorizeOwnership,
  validateUpdateDeck,
  updateDeckHandler,
);
router.put(
  '/add/:id',
  authenticate,
  validateId,
  authorizeOwnership,
  validateCardList,
  insertCardsHandler,
);
router.put(
  '/remove/:id',
  authenticate,
  validateId,
  authorizeOwnership,
  validateCardList,
  removeCardsHandler,
);
router.delete(
  '/:id',
  authenticate,
  validateId,
  authorizeOwnership,
  deleteDeckHandler,
);

export default router;
