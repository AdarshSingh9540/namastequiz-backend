const express = require('express');
const axios = require('axios');
const router = express.Router();

const generateMCQQuestions = async (topic) => {
  const message = `You are given with a topic and you have to generate 5 questions with their multiple choice options. The topic is "${topic}". You have to follow the response format like this
  [
    {
      "Question": "First question",
      "Options": ["Option1", "Option2", "Option3", "Option4"],
      "answer": "ans"
    },
    {
      "Question": "Second question",
      "Options": ["Option1", "Option2", "Option3", "Option4"],
      "answer": "ans"
    },
    {
      "Question": "Third question",
      "Options": ["Option1", "Option2", "Option3", "Option4"],
      "answer": "ans"
    }
  ]`;

  try {
    const response = await axios.post('https://ai-mu-two.vercel.app/chat', { message }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data) {
      return response.data;
    } else {
      throw new Error('Failed to generate response!');
    }
  } catch (error) {
    throw new Error('Failed to fetch questions');
  }
};

router.post('/', async (req, res) => {
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
