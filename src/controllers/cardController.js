import {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
} from '../services/cardService.js';

export async function getAllCardsHandler(req, res) {
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
  let cards = await getAllCards(options);
  res.status(200).json(cards);
}

export async function getCardByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const card = await getCardById(id);
  res.status(200).json(card);
}

export async function createCardHandler(req, res) {
  const { name, traits, cost, stats ='none', type, text='none', aspects  } = req.body;
  const newCard = await createCard({ name, traits, cost: parseInt(cost), stats, type, text, aspects });
  res.status(201).json(newCard);
}

export async function updateCardHandler(req, res) {
  const id = parseInt(req.params.id);
  let { name, traits, cost, stats, type, text  } = req.body;
  if (cost !== undefined){
    cost = parseInt(cost);
  }
  const updatedCard = await updateCard(id, { name, traits, cost, stats, type, text });
  res.status(200).json(updatedCard);
}

export async function deleteCardHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteCard(id);
  res.status(204).send();
}
