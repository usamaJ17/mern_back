// quizModel.js

const mongoose = require("mongoose");

const QuestionarySchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  selectedAnswer: {
    type: String,
    default: "",
  },
 
});

const Questionary = mongoose.model("Questionary", QuestionarySchema);

module.exports = Questionary;
