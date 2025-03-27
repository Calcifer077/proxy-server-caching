const express = require('express');
const pokemonRouter = require('./routes/pokemonRouter');

const app = express();

app.use('/api/v1/pokemon', pokemonRouter);

module.exports = app;
