import express from 'express';
import { createAnalyseIdea, deleteIdea, getAllIdeas, getSpecificIdea } from '../controllers/idea-controller.js';
const router = express.Router();

// POST /api/ideas - Create and analyze a new idea
router.post('/', createAnalyseIdea);

// GET /api/ideas - Get all ideas
router.get('/', getAllIdeas)
// GET /api/ideas/:id - Get a specific idea with full analysis
router.get('/:id', getSpecificIdea);

// DELETE /api/ideas/:id - Delete an idea
router.delete('/:id', deleteIdea);

export default router;