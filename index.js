require('dotenv').config();

const express = require('express');

const app = express();

const medicines = require('./controllers/medicines');

app.use(express.json());

app.use('/', medicines);

app.listen(process.env.PORT || 3001, () => console.log(`Server has been started on PORT ${process.env.PORT || 3001}!`));