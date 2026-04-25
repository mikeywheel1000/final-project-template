import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/cardRepo.js';

export async function getAllCards(options) {
  return getAll(options);
}

export async function getCardById(id) {
  const card = await getById(id);
  if (card) return card;
  else {
    const error = new Error(`Card ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createCard(cardData) {
  return create(cardData);
}

export async function updateCard(id, updatedData) {
  const updatedCard = await update(id, updatedData);
  if (updatedCard) return updatedCard;
  else {
    const error = new Error(`Card ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteCard(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Card ${id} not found`);
    error.status = 404;
    throw error;
  }
}
