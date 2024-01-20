require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connection = require('./db');
const router = require("./Routes/index.js");
const erroeHandling = require("./midleware/errorHandling")
const cookieParser = require('cookie-parser');
const app = express();
const Quiz = require('./models/Quiz.js')

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173','https://mern-task-app-back.onrender.com','https://app.counselingadhd.com'], credentials: true }));
async function insertDummyQuestions() {
  try {
    // Check if there are any existing quizzes
    const existingQuizzes = await Quiz.find();

    // If no quizzes exist, add dummy questions
    if (existingQuizzes.length === 0) {
      const dummyQuestions = [
        {
          question: "What color is the sky?",
          options: ["Red", "Blue", "Green", "Yellow"],
          correctAnswer: "Blue",
        },
        {
          question: "What color is a banana?",
          options: ["Blue", "Green", "Yellow", "Red"],
          correctAnswer: "Yellow",
        },
        {
          question: "What color is a Shirt?",
          options: ["Blue", "Green", "Yellow", "Red"],
          correctAnswer: "Green",
        },
        // Add more dummy questions as needed
      ];

      // Insert the dummy questions into the database
      await Quiz.insertMany(dummyQuestions);
    }
  } catch (error) {
    console.error("Error inserting dummy questions:", error.message);
  }
}
insertDummyQuestions();

app.get("/api/quiz", async (req, res) => {
  try {
    // Retrieve all quizzes
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});
// Use the imported router with the base path "/api"
app.use(cookieParser());
app.use("/api", router);

const port = process.env.PORT || 8000;

// Database Connection
connection();

app.use(erroeHandling);

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
