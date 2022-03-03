const express = require('express');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const userRoutes = require('./routes/user');

const orderRoutes = require('./routes/order');

const feedbackRoutes = require('./routes/feedback');

const errorController = require('./controllers/error');

const http = require('http');

const WebSocket = require('ws');

const app = express();

const port = process.env.PORT || 3000;

const cors = require('cors');    

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'GET', 'POST', 'PUT', 'DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors());

app.use('/auth', authRoutes);

app.use('/user', userRoutes);

app.use('/order', orderRoutes);

app.use('/feedback', feedbackRoutes);

app.use(errorController.getError404);

app.use(errorController.getError500);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

server.listen(3000, function listening() {
  console.log('Listening on %d', server.address().port);
});



