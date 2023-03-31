require('dotenv').config();
require('express-async-errors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connect = require('./config/mongoose');
const bcrypt = require('bcryptjs');
const apiV1Routes = require('./routes/index'); 
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const notFoundMiddleware = require('./middlewares/not-found');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss');
const rateLimiter = require('express-rate-limit');

const PORT = process.env.PORT;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimiter)

app.use('/api',apiV1Routes);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

app.listen(PORT, async () => {
    console.log(`Server is up and running at port: ${PORT}`);
    await connect();

    console.log('connected to mongoDB');
})



