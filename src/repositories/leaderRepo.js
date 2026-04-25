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
  const leaders = await prisma.leader.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
  });
  return leaders;
}

export async function getById(id) {
  const leader = await prisma.leader.findUnique({ where: { id } });
  return leader;
}

export function create(leaderData) {
  const newLeader = prisma.leader.create({ data: leaderData });
  return newLeader;
}

export async function update(id, updatedData) {
  try {
    const updatedLeader = await prisma.leader.update({
      where: { id },
      data: updatedData,
    });
    return updatedLeader;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedLeader = await prisma.leader.delete({
      where: { id },
    });
    return deletedLeader;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
