require("dotenv").config();

require('./config/database.js')

const { PORT } = process.env;

const express = require("express");

const app = express();

const reviewsRouter = require('./routes/reviews')

const cors = require("cors")
const morgan = require("morgan")

app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

app.use('/reviews', reviewsRouter)

app.get("/", (req, res) => {
    res.send("Rabbt Ears");
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`listening on PORT ${PORT}`));

