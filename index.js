require('dotenv').config();
require('express-async-errors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connect = require('./config/mongoose');
const apiV1Routes = require('./routes/index'); 
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const notFoundMiddleware = require('./middlewares/not-found');


const PORT = process.env.PORT;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/api',apiV1Routes);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

app.listen(PORT, async () => {
    console.log(`Server is up and running at port: ${PORT}`);
    await connect();

    console.log('connected to mongoDB');
})



