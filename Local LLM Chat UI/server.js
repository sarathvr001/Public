const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  try {
    // Forward the body exactly as received
    const ollamaRes = await axios.post('http://localhost:11434/api/generate', req.body, {
      responseType: 'stream'
    });
    // Stream Ollama's response to the client
    ollamaRes.data.pipe(res);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Proxy server running at http://localhost:3000'));

