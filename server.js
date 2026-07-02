import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Google GenAI client lazily to avoid crashing on start if API key is missing
let aiClient = null;
function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required. Please set it in your environment or Secrets panel.');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// API endpoint for analyzing student budget
app.post('/api/analyze', async (req, res) => {
  try {
    const { income, food, fuel, entertainment, bills, savingsGoal } = req.body;

    // Validate request inputs
    const parsedIncome = parseFloat(income);
    const parsedFood = parseFloat(food) || 0;
    const parsedFuel = parseFloat(fuel) || 0;
    const parsedEntertainment = parseFloat(entertainment) || 0;
    const parsedBills = parseFloat(bills) || 0;
    const parsedSavingsGoal = parseFloat(savingsGoal) || 0;

    if (isNaN(parsedIncome) || parsedIncome <= 0) {
      return res.status(400).json({ error: 'Monthly Income must be a positive number.' });
    }

    const ai = getAIClient();
    
    // Construct prompt for Gemini
    const totalExpenses = parsedFood + parsedFuel + parsedEntertainment + parsedBills;
    const netSavings = parsedIncome - totalExpenses;
    
    const prompt = `You are an expert financial advisor specializing in student budgeting.
Analyze the following student budget:
- Monthly Income: $${parsedIncome}
- Expenses:
  - Food: $${parsedFood}
  - Fuel/Transport: $${parsedFuel}
  - Entertainment: $${parsedEntertainment}
  - Bills: $${parsedBills}
- Total Expenses: $${totalExpenses}
- Net Remaining: $${netSavings}
- Savings Goal: $${parsedSavingsGoal}

Generate a comprehensive, encouraging budget analysis specifically tailored for a student's life. Return the response in strict JSON format matching the schema requested. Keep suggestions practical, cost-effective, and student-focused.`;

    // Request structured JSON from Gemini using the recommended model
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            budgetScore: { 
              type: 'INTEGER', 
              description: 'A financial health score from 0 to 100 based on their income, expenses, and savings goal.' 
            },
            spendingAnalysis: { 
              type: 'STRING', 
              description: 'A detailed analysis of where their money goes and whether their expenses are reasonable for a student.' 
            },
            dailySpendingLimit: { 
              type: 'NUMBER', 
              description: 'The recommended safe daily allowance for variable expenses (like food, transport, entertainment) after bills and savings goals.' 
            },
            savingSuggestions: { 
              type: 'ARRAY', 
              items: { type: 'STRING' },
              description: '3-4 student-friendly tips on how to save money on food, transport, entertainment, or bills.' 
            },
            financialAdvice: { 
              type: 'STRING', 
              description: 'General smart financial advice (e.g. setting up emergency funds, starting small investments, or avoiding common student debt traps).' 
            },
            motivationTip: { 
              type: 'STRING', 
              description: 'An inspiring, high-energy motivational tip to keep them focused on reaching their budget and savings goals.' 
            }
          },
          required: [
            'budgetScore',
            'spendingAnalysis',
            'dailySpendingLimit',
            'savingSuggestions',
            'financialAdvice',
            'motivationTip'
          ]
        }
      }
    });

    const aiResponseText = response.text;
    const budgetAnalysis = JSON.parse(aiResponseText);
    
    res.json(budgetAnalysis);
  } catch (error) {
    console.error('Error during budget analysis:', error);
    res.status(500).json({ 
      error: 'Failed to analyze budget. Please verify your GEMINI_API_KEY is configured correctly.',
      details: error.message 
    });
  }
});

// Fallback to serve the main HTML file for any non-API routes (supports Single Page experience if routing is simulated on frontend)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`AI Budget Planner server listening on port ${PORT}`);
});
