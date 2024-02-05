//Imports dotenv
require('dotenv').config();

//Imports database configuration
require('./config/database');

//Imports port from environmental variables
const { PORT } = process.env;

//Imports express
const express = require('express');

//Creates an instance of express assigned to app
const app = express();

//Imports reviews and auth routers
const reviewsRouter = require('./routes/reviews');
const authRouter = require('./routes/auth');

//Imports cors and morgan
const cors = require('cors');
const morgan = require('morgan');

app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use(cors());
app.use(morgan('dev'));

//Creates routes with reviews and auth routers
app.use('/reviews', reviewsRouter);
app.use('/auth', authRouter);

//Creates landing route
app.get('/', (req, res) => {
    res.send('Rabbt Ears');
});

//assigns port to PORT if it exists or 4000
const port = PORT || 4000;

//Initializes app
app.listen(port, () => console.log(`listening on PORT ${PORT}`));

