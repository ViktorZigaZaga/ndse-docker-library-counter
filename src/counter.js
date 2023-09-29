const express = require('express');
const redis = require('redis');

const app = express();

const PORT = process.env.PORT || 'https://counter:3003';
const REDIS_URL = process.env.REDIS_URL || 'redis://storage:6379';

const client = redis.createClient({url: REDIS_URL});

(async () => {
    await client.connect();
})();

app.use(express.json());

app.get('/counter/:bookId',  async (req, res) => {
    const {bookId} = req.params;
    const cnt = await client.get(`${bookId}`);
    res.json({cnt: cnt}); 
});

app.post('/counter/:bookId/incr', async(req, res) => {
    const {bookId} = req.params;
    const cnt = await client.incr(`${bookId}`);
    res.json({cnt: cnt});
});

app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`);
});