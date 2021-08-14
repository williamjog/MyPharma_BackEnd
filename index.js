require('dotenv').config();

const express = require('express');

const app = express();

const medicines = require('./controllers/medicines');

app.use(express.json());

app.use('/', medicines);

app.use('/images', express.static('uploads'));

app.listen(process.env.PORT || 3000, () => console.log("Server has been started."));