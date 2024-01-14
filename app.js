const express = require('express');
const http = require('http');
const { readdirSync } = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const bodyParse = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const app = express();
const server = http.createServer(app);

connectDB();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParse.json({ limit: '10mb'}));
app.use(cookieParser());

readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

const port = 3000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });

