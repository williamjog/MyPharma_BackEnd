require('dotenv').config();

const express = require('express');
const cors = require('cors');

const medicines = require('./controllers/medicines');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/', medicines);

app.use('/images', express.static(__dirname + '/images'));

app.listen(process.env.PORT || 3000, () => console.log("Server has been started."));