import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/leaderRepo.js';

export async function getAllLeaders(options) {
  return getAll(options);
}

export async function getLeaderById(id) {
  const leader = await getById(id);
  if (leader) return leader;
  else {
    const error = new Error(`Leader ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createLeader(leaderData) {
  return create(leaderData);
}

export async function updateLeader(id, updatedData) {
  const updatedLeader = await update(id, updatedData);
  if (updatedLeader) return updatedLeader;
  else {
    const error = new Error(`Leader ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteLeader(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Leader ${id} not found`);
    error.status = 404;
    throw error;
  }
}
