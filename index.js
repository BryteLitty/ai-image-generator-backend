const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');


const app = express();

// configure bodyparser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/openai', require('./routes/openaiRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));