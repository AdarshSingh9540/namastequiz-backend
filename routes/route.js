const express = require('express');
const axios = require('axios');
const router = express.Router();

const generateMCQQuestions = async (topic) => {
  const message = `You are given with a topic and you have to generate 5 questions with their multiple choice options. the topic is "${topic}". You have to follow the response format like this
  [
    {
      "Question": "first question",
      "Options": ["Option1", "Option2", "Option3", "Option4"],
      "answer":"ans"
    },
    {
      "Question": "Second question",
      "Options": ["Option1", "Option2", "Option3", "Option4"],
      "answer":"ans"
    },
    {
      "Question": "Third question",
      "Options": ["Option1", "Option2", "Option3", "Option4"],
      "answer":"ans"
    }
  ]

  Don't include anything else in your response except the questions. Response should be such that I can use it with .map function of JavaScript.
  `;

  const response = await axios.post('https://snapt-indol.vercel.app/api', {
    "auth-x": "@riop&%4ffubr",
    "Qa_id": "prajjwal@0522",
    "message": message
  });

  if (response.data) {
    return response.data;
  } else {
    throw new Error('Failed to generate response!');
  }
};

router.post('/post/question', async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).send('Topic is required');
  }

  try {
    const questions = await generateMCQQuestions(topic);
    res.send(questions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
