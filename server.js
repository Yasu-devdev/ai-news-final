const express = require('express');
const { POST } = require('./.next/server/app/api/webhook/route.js');

const app = express();
const port = process.env.PORT || 8080;

// Stripe Webhookのリクエストを処理するルート
app.post('/api/webhook', (req, res) => {
  POST(req).then(async (response) => {
    const body = await response.json();
    res.status(response.status).json(body);
  }).catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});