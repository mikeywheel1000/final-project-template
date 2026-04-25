import express from 'express';
import {
  getAllLeadersHandler,
  getLeaderByIdHandler,
  createLeaderHandler,
  updateLeaderHandler,
  deleteLeaderHandler,
} from '../controllers/leaderController.js';

import {
  validateId,
  validateCreateLeader,
  validateUpdateLeader,
  validateLeaderQuery,
} from '../middleware/leaderValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';

const router = express.Router();
router.get('/', validateLeaderQuery, getAllLeadersHandler);
router.get('/:id', validateId, getLeaderByIdHandler);
router.post('/', authenticate, authorizeAdmin, validateCreateLeader, createLeaderHandler);
router.put(
  '/:id',
  authenticate,
  validateId,
  authorizeAdmin,
  validateUpdateLeader,
  updateLeaderHandler,
);
router.delete(
  '/:id',
  authenticate,
  validateId,
  authorizeAdmin,
  deleteLeaderHandler,
);

export default router;
