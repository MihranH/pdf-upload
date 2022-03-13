const express = require('express');
const cors = require('cors');
const axios = require('axios');
const config = require('./config');
const app = express();
const PORT = process.env.PORT || 3003;
const UPLOAD_SERVICE = process.env.UPLOAD_SERVICE || config.UPLOAD_SERVICE;

app.use(express.json());
app.use(cors());

app.post('/api/event', async (req, res) => {
    await axios.post(`${UPLOAD_SERVICE}/event`, req.body);
    return res.send({ eventReceived: true });
});

app.listen(PORT, () => {
  console.log(`Event bus listening to port ${PORT}`);
});