require('dotenv').config();

const express = require('express');
const cors = require('cors');

const products = require('./controllers/products');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/', products);

app.use('/images', express.static(__dirname + '/images'));

app.listen(process.env.PORT || 3001, () => console.log("Server has been started."));