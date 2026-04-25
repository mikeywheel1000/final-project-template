import {
  getAll,
  getById,
  create,
  update,
  remove,
  insertCard,
  removeCard
} from '../repositories/deckRepo.js';

export async function getAllDecks(options) {
  return getAll(options);
}

export async function getDeckById(id) {
  const deck = await getById(id);
  if (deck) return deck;
  else {
    const error = new Error(`Deck ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createDeck(deckData) {
  return create(deckData);
}

export async function updateDeck(id, updatedData) {
  const updatedDeck = await update(id, updatedData);
  if (updatedDeck) return updatedDeck;
  else {
    const error = new Error(`Deck ${id} not found`);
    error.status = 404;
    throw error;
  }
}
export async function insertCards(id, cards) {
  const updatedDeck = await insertCard(id, cards);
  if (updatedDeck) return updatedDeck;
  else {
    const error = new Error(`Deck ${id} not found`);
    error.status = 404;
    throw error;
  }
}
export async function removeCards(id, cards) {
  const updatedDeck = await removeCard(id, cards);
  if (updatedDeck) return updatedDeck;
  else {
    const error = new Error(`Deck ${id} not found`);
    error.status = 404;
    throw error;
  }
}
export async function deleteDeck(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Deck ${id} not found`);
    error.status = 404;
    throw error;
  }
}
