# AI Startup Idea Validator

A full-stack application that analyzes startup ideas using Google Gemini AI.

**Tech Stack:** React.js | Node.js | Express.js | MongoDB | Google Gemini AI

## Deployment

https://ai-startup-validator-three.vercel.app

## Installation And Running

### Backend Setup

```bash
cd backend
npm install
npm start
```

Create `.env` file in `server/` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/startup-validator
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## AI Prompt Used

The following prompt is sent to Google Gemini AI for analyzing startup ideas:

```
You are an expert startup consultant. Analyze the given startup idea and return a structured JSON object with the following fields: problem, customer, market, competitors (array of 3 objects with 'name' and 'differentiation' fields), tech_stack (array of 4-6 technologies), risk_level (Low/Medium/High), profitability_score (integer 0-100), justification.

Rules:
- Keep answers concise and realistic
- 'competitors' should contain exactly 3 competitors with one-line differentiation each
- 'tech_stack' should be 4-6 practical technologies for MVP
- 'profitability_score' must be an integer between 0-100
- Return ONLY valid JSON, no markdown formatting, no backticks, no preamble

Input:
{
  "title": "${title}",
  "description": "${description}"
}

Return ONLY the JSON object.
```

### Example Response Structure

```json
{
  "problem": "Describes the core problem the idea solves",
  "customer": "Target customer persona description",
  "market": "Market size and opportunity analysis",
  "competitors": [
    {
      "name": "Competitor Name 1",
      "differentiation": "How this idea differs"
    },
    {
      "name": "Competitor Name 2",
      "differentiation": "How this idea differs"
    },
    {
      "name": "Competitor Name 3",
      "differentiation": "How this idea differs"
    }
  ],
  "tech_stack": ["React", "Node.js", "MongoDB", "Express", "AWS", "Stripe"],
  "risk_level": "Medium",
  "profitability_score": 75,
  "justification": "Detailed reasoning for the assessment"
}
```

## API Endpoints

- `POST /api/ideas` - Submit and analyze a new idea
- `GET /api/ideas` - Get all ideas
- `GET /api/ideas/:id` - Get specific idea details
- `DELETE /api/ideas/:id` - Delete an idea

## Quick Test

1. Open http://localhost:3000
2. Click "Submit Idea"
3. Enter:
   - **Title:** "AI Fitness Coach"
   - **Description:** "Mobile app that uses computer vision to analyze workout form and provide real-time feedback"
4. Click "Analyze Idea"
5. View the AI-generated report!

# Architecture Documentation

## System Overview

The AI Startup Idea Validator is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js) with Google Gemini AI integration.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ Submit View  │  │  Dashboard   │  │  Detail View    │   │
│  └──────────────┘  └──────────────┘  └─────────────────┘   │
│           │                │                   │             │
│           └────────────────┴───────────────────┘             │
│                          │                                   │
│                     Fetch API                               │
└─────────────────────────────┼───────────────────────────────┘
                              │
                    HTTP (REST API)
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                    Backend (Node.js + Express)               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  API Routes Layer                      │  │
│  │   POST /ideas  │  GET /ideas  │  GET /ideas/:id       │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │               Business Logic Layer                     │  │
│  │    (ideaRoutes.js - Route Handlers)                   │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────┼───────────────────────────────┐  │
│  │        AI Service     │      Database Layer           │  │
│  │    (aiService.js)     │    (Mongoose Models)          │  │
│  └───────────────────────┴───────────────────────────────┘  │
│              │                        │                      │
└──────────────┼────────────────────────┼──────────────────────┘
               │                        │
        Google Gemini API          MongoDB
               │                        │
        ┌──────▼──────┐         ┌──────▼──────┐
        │  Gemini AI  │         │  MongoDB    │
        │   Service   │         │  Database   │
        └─────────────┘         └─────────────┘
```
