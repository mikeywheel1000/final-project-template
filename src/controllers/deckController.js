import {
  getAllDecks,
  getDeckById,
  createDeck,
  updateDeck,
  deleteDeck,
  insertCards,
  removeCards
} from '../services/deckService.js';

export async function getAllDecksHandler(req, res) {
  const {
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5,
  } = req.query;

  const options = {
    search,
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  };
  let decks = await getAllDecks(options);
  res.status(200).json(decks);
}

export async function getDeckByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const deck = await getDeckById(id);
  res.status(200).json(deck);
}

export async function createDeckHandler(req, res) {
  const { name, description, leaderId } = req.body;
  const newDeck = await createDeck({ name, description, leaderId: parseInt(leaderId), authorId: req.user.id });
  res.status(201).json(newDeck);
}

export async function updateDeckHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name, description, leaderId  } = req.body;
  const updatedDeck = await updateDeck(id, { name, description, leaderId: parseInt(leaderId)});
  res.status(200).json(updatedDeck);
}
export async function insertCardsHandler(req, res) {
  const id = parseInt(req.params.id);
  const { cards } = req.body;
  const updatedDeck = await insertCards(id, { cards});
  res.status(200).json(updatedDeck);
}

export async function removeCardsHandler(req, res) {
  const id = parseInt(req.params.id);
  const { cards } = req.body;
  const updatedDeck = await removeCards(id, { cards});
  res.status(200).json(updatedDeck);
}

export async function deleteDeckHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteDeck(id);
  res.status(204).send();
}
