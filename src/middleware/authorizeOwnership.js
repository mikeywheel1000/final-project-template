import { getDeckById } from '../services/deckService.js';

export async function authorizeOwnership(req, res, next) {
  const id = parseInt(req.params.id);
  const card = await getDeckById(id);
  if (card.authorId !== req.user.id) {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }
  next();
}