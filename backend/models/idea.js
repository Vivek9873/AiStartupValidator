import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    analysis: {
        problem: {
            type: String,
            required: true
        },
        customer: {
            type: String,
            required: true
        },
        market: {
            type: String,
            required: true
        },
        competitors: [{
            name: String,
            differentiation: String
        }],
        tech_stack: [{
            type: String
        }],
        risk_level: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            required: true
        },
        profitability_score: {
            type: Number,
            min: 0,
            max: 100,
            required: true
        },
        justification: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true
});

const Idea = mongoose.model('Idea', ideaSchema);
export default Idea;
