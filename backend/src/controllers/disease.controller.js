import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const predictDisease = async (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms) {
    return res.status(400).json({ error: 'Symptoms are required' });
  }

  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'openai/gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful medical assistant. Given symptoms, suggest possible diseases briefly.'
        },
        {
          role: 'user',
          content: `Symptoms: ${symptoms}`
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,  // Access API key from env file
        'Content-Type': 'application/json'
      }
    });

    const reply = response.data.choices[0].message.content;
    res.json({ prediction: reply });

  } catch (err) {
    res.status(500).json({ error: 'Prediction failed', details: err.message });
  }
};
