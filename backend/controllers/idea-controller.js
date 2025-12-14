import Idea from '../models/idea.js';
import { analyzeIdea } from "./gemini.js";

export const createAnalyseIdea = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                error: 'Title and description are required'
            });
        }

        // Get AI analysis
        const analysis = await analyzeIdea(title, description);

        // Save to database
        const idea = new Idea({
            title,
            description,
            analysis
        });

        await idea.save();

        res.status(201).json(idea);
    } catch (error) {
        console.error('Error creating idea:', error);
        res.status(500).json({
            error: 'Failed to analyze idea',
            message: error.message
        });
    }
}

export const getAllIdeas = async (req, res) => {
    try {
        const ideas = await Idea.find()
            .sort({ createdAt: -1 })
            .select('title description analysis.risk_level analysis.profitability_score createdAt');

        res.json(ideas);
    } catch (error) {
        console.error('Error fetching ideas:', error);
        res.status(500).json({
            error: 'Failed to fetch ideas',
            message: error.message
        });
    }
};


export const getSpecificIdea = async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);

        if (!idea) {
            return res.status(404).json({ error: 'Idea not found' });
        }

        res.json(idea);
    } catch (error) {
        console.error('Error fetching idea:', error);
        res.status(500).json({
            error: 'Failed to fetch idea',
            message: error.message
        });
    }
}

export const deleteIdea = async (req, res) => {
    try {
        const idea = await Idea.findByIdAndDelete(req.params.id);

        if (!idea) {
            return res.status(404).json({ error: 'Idea not found' });
        }

        res.json({
            message: 'Idea deleted successfully',
            id: req.params.id
        });
    } catch (error) {
        console.error('Error deleting idea:', error);
        res.status(500).json({
            error: 'Failed to delete idea',
            message: error.message
        });
    }
}