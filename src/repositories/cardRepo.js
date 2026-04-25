import prisma from '../config/db.js';

export async function getAll({ search, sortBy, order, offset, limit }) {
  const conditions = {};
  if (search) {
    conditions.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { traits: { contains: search, mode: 'insensitive' } },
      { text: { contains: search, mode: 'insensitive' } },
    ];
  }
  const cards = await prisma.card.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
  });
  return cards;
}

export async function getById(id) {
  const card = await prisma.card.findUnique({ where: { id } });
  return card;
}

export function create(cardData) {
  const newCard = prisma.card.create({ data: cardData });
  return newCard;
}

export async function update(id, updatedData) {
  try {
    const updatedCard = await prisma.card.update({
      where: { id },
      data: updatedData,
    });
    return updatedCard;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedCard = await prisma.card.delete({
      where: { id },
    });
    return deletedCard;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
