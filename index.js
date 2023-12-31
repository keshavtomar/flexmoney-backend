const express = require('express')
const app = express()
// const database = require("./db");
const cors = require('cors');
const usertable = require('./tables/user');
// usertable();

// database();

app.get("/", (req, res) => {
    res.send({ status: ok });
})

app.use(cors());



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://flexmoney-virid.vercel.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());


app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/LoginUser'));
app.use('/api', require('./Routes/UserStatus'));
app.use('/api', require('./Routes/EnrollUser'));
app.use('/api', require('./Routes/checkPayment'));


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})