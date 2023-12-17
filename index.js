const express = require('express')
const app = express()
const database = require("./db");
const cors = require('cors');
database();

app.get("/", (req, res) => {
    res.send({ status: ok });
})

app.use(cors());



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://foodie-website-two.vercel.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})