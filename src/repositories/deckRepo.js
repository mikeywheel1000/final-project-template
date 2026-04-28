import prisma from '../config/db.js';

export async function getAll({ search, sortBy, order, offset, limit }) {
  const conditions = {};
  if (search) {
    conditions.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }
  const decks = await prisma.deck.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
  });
  return decks;
}

export async function getById(id) {
  const deck = await prisma.deck.findUnique({ where: { id } });
  return deck;
}

export async function create(deckData) {
  try{
    console.log("attempting to create deck!")
  const newDeck = await prisma.deck.create({ data: deckData });
  return newDeck;
  }
  catch (error) {
  if (error.code === 'P2003'){

  
  const error = new Error(
      `Cannot create Deck: referenced Leader with id ${deckData.leaderId} does not exist`,
    );
    error.status = 400;
    throw error; 
  }
  else{
    console.log("this is working");
    throw error;
  }

  }
}

export async function update(id, updatedData) {
  try {
    const updatedDeck = await prisma.deck.update({
      where: { id },
      data: updatedData,
    });
    return updatedDeck;
  } catch (error) {
    if (error.code === 'P2003')  error = new Error(
      `Cannot update Deck: referenced Leader with id ${updatedData.leaderId} does not exist`,);
    error.status = 400;
    throw error;;
    throw error;
  }
}

export async function insertCard(id, cards) {
  try{
  let updatedDeck = await prisma.deck.findUnique({ where: { id } });
  let test = JSON.parse(JSON.stringify(cards));
   test = test.cards.split(',');
  for (const card of test){
    let updatedDeck = await prisma.deck.update({
  where: { id },
  data: {
    cards: {
      connect: [{ id: parseInt(card) }],
    }
  }
}); 
  }
  const cardsForDeck =await prisma.card.findMany({
  where: {
    decks: { some: { id } } // Fetches cards associated with a specific deck
  }
});
  return cardsForDeck;
  }
  catch (error) {
    if (error.code === 'P2025'){
       error = new Error(`One or more cards not found. Send me an email, and let me know what's missing!`);
    error.status = 404;
    throw error;
    }
    throw error;
  }
}
export async function removeCard(id, cards) {
  try{
  let updatedDeck = await prisma.deck.findUnique({ where: { id } });
  let test = JSON.parse(JSON.stringify(cards));
   test = test.cards.split(',');
  for (const card of test){
    let updatedDeck = await prisma.deck.update({
  where: { id },
  data: {
    cards: {
      disconnect: [{ id: parseInt(card) }],
    }
  }
}); 
  }
  const cardsForDeck =await prisma.card.findMany({
  where: {
    decks: { some: { id } } // Fetches cards associated with a specific deck
  }
});
  return cardsForDeck;
  }
  catch (error) {
    if (error.code === 'P2025'){
       error = new Error(`One or more cards not found. Send me an email, and let me know what's missing!`);
    error.status = 404;
    throw error;
    }
    throw error;
  }
}
export async function remove(id) {
  try {
    const deletedDeck = await prisma.deck.delete({
      where: { id },
    });
    return deletedDeck;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
