# AI Budget Planner

## Project Overview

AI Budget Planner is a web application that helps students manage their monthly budget using Google Gemini AI. Users can enter their monthly income, expenses, and savings goal. The AI analyzes the budget and provides personalized financial advice, spending suggestions, and a recommended daily spending limit.

This project was developed for a Web Development Hackathon.



# Features

- User Signup
- User Login
- Dashboard
- Budget Analysis Form
- AI Budget Analysis using Google Gemini API
- Budget Score
- Spending Analysis
- Daily Spending Limit
- Saving Suggestions
- Financial Advice
- Motivation Tip
- Responsive User Interface
- Local Storage Authentication



# Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript

## Backend

- Node.js
- Express.js

## AI Integration

- Google AI Studio
- Google Gemini API (gemini-2.5-flash)

## Authentication

- Local Storage (Mock Authentication)


# Project Structure

```
AI-Budget-Planner/

│── public/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── analysis.html
│   ├── style.css
│   └── app.js
│
├── server.js
├── package.json
├── .env
├── .env.example
└── README.md
```



# How It Works

1. The user creates an account.
2. The user logs into the application.
3. The user enters:
   - Monthly Income
   - Food Expenses
   - Transport Expenses
   - Entertainment Expenses
   - Bills
   - Savings Goal
4. The data is sent to the backend.
5. The backend sends the information to Google Gemini AI.
6. Gemini analyzes the budget.
7. The AI returns:
   - Budget Score
   - Spending Analysis
   - Daily Spending Limit
   - Saving Suggestions
   - Financial Advice
   - Motivation Tip
8. The results are displayed on the screen.



# How Google Gemini AI Was Used

Google Gemini AI is the main feature of this project.

The user's financial information is sent to Gemini through the backend API. Gemini analyzes the income, expenses, and savings goal and generates:

- Budget Score
- Spending Analysis
- Daily Spending Limit
- Saving Suggestions
- Financial Advice
- Motivation Tip

This makes the application intelligent instead of using fixed rules.



# Installation

## 1. Clone the repository

```bash
git clone <repository-link>
```

## 2. Open the project folder

```bash
cd AI-Budget-Planner
```

## 3. Install dependencies

```bash
npm install
```

## 4. Create a .env file

Add your Google Gemini API Key.

```
GEMINI_API_KEY=YOUR_API_KEY
APP_URL=http://localhost:5000
```

## 5. Start the server

```bash
node server.js
```

## 6. Open the application

```
http://localhost:5000
```


# Future Improvements

- Database Integration
- User Profile Management
- Expense History
- Charts and Graphs
- Monthly Reports
- Expense Categories
- Export Budget Report as PDF


# License

Copyright © 2026 Muhammad Tayyab.

Developed for the Web Development Hackathon.

This project may be viewed and used for educational and learning purposes. Any commercial use, redistribution, or reproduction without permission from the author is prohibited.
