import {
  getAllLeaders,
  getLeaderById,
  createLeader,
  updateLeader,
  deleteLeader,
} from '../services/leaderService.js';

export async function getAllLeadersHandler(req, res) {
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
  let leaders = await getAllLeaders(options);
  res.status(200).json(leaders);
}

export async function getLeaderByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const leader = await getLeaderById(id);
  res.status(200).json(leader);
}

export async function createLeaderHandler(req, res) {
  const { name, traits, flipCondition, aspects, stats ='none', type, text='none'  } = req.body;
  const newLeader = await createLeader({ name, traits, flipCondition, aspects, stats, type, text });
  res.status(201).json(newLeader);
}

export async function updateLeaderHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name, traits, flipCondition, aspects, stats, type, text  } = req.body;
  const updatedLeader = await updateLeader(id, { name, traits, flipCondition, aspects, stats, type, text });
  res.status(200).json(updatedLeader);
}

export async function deleteLeaderHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteLeader(id);
  res.status(204).send();
}
