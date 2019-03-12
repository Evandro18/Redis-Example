// server.js
const express = require('express');
const app = express();
const redisClient = require('./redis-client');

app.get('/store/:key', async (req, res) => {
    const { key } = req.params
    const value = req.query;
    console.log(`[VALUE]: ${value}`);
    await redisClient.setAsync(key, JSON.stringify(value));
    return res.send('Success');
});

app.get('/get/:key', async (req, res) => {
  const { key } = req.params
  const rawData = await redisClient.getAsync(key);
  console.log(`[RAWDATA]: ${JSON.stringify(rawData)}`);
  return res.json(JSON.parse(rawData))
})

app.get('/keys', async (req, res) => {
  try {
    const { key } = req.query
    const rawData = await redisClient.keysAsync(key)
    return res.json(rawData)
  } catch (err) {
    if (err) {
      console.log('err: ', err);
      res.status(400).json(err)
    }
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
