
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});


export const analyzeIdea = async (title, description) => {
    try {
        // Get the Gemini model

        // Construct the prompt
        const prompt = `You are an expert startup consultant. Analyze the given startup idea and return a structured JSON object with the following fields: problem, customer, market, competitors (array of 3 objects with 'name' and 'differentiation' fields), tech_stack (array of 4-6 technologies), risk_level (Low/Medium/High), profitability_score (integer 0-100), justification.
        
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
            
        Return ONLY the JSON object.`;

        // Generate content
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        console.log(response);
        let text = response.text;

        // Clean the response - remove markdown code blocks if present
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        // Parse the JSON response
        const analysis = JSON.parse(text);

        // Validate the response structure
        if (!analysis.problem || !analysis.customer || !analysis.market ||
            !analysis.competitors || !analysis.tech_stack ||
            !analysis.risk_level || typeof analysis.profitability_score !== 'number') {
            throw new Error('Invalid AI response structure');
        }

        // Ensure competitors is an array of objects with correct structure
        if (!Array.isArray(analysis.competitors) || analysis.competitors.length !== 3) {
            throw new Error('Competitors must be an array of 3 items');
        }

        // Ensure tech_stack is an array
        if (!Array.isArray(analysis.tech_stack)) {
            throw new Error('Tech stack must be an array');
        }

        return analysis;

    } catch (error) {
        console.error('Error analyzing idea with Gemini:', error);

        // Return a fallback mock response if AI fails
        return {
            problem: "Analysis unavailable - AI service error",
            customer: "Unable to determine customer persona",
            market: "Market analysis pending",
            competitors: [
                { name: "Competitor 1", differentiation: "Analysis pending" },
                { name: "Competitor 2", differentiation: "Analysis pending" },
                { name: "Competitor 3", differentiation: "Analysis pending" }
            ],
            tech_stack: ["React", "Node.js", "MongoDB", "Express"],
            risk_level: "Medium",
            profitability_score: 50,
            justification: "AI analysis failed. Please try again or check your API configuration."
        };
    }
};
