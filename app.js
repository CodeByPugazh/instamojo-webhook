const express = require('express')
const cors = require("cors");
const CalculateMac = require('./Lib/im-mac')
require('dotenv').config()

const app = express()
app.use(cors()); //Allows all origins
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/hook', (req, res) => {
    const received_mac = req.body.mac
    const secret = process.env.IM_SALT || 'YOUR_SALT_SECRET'
    const calculated_mac = CalculateMac(req.body, secret)

    if (received_mac === calculated_mac) {
        console.log('Mac Ok')
    } else {
        console.log('Mac Mismatch')
    }

    res.status(200).send('ok')
})

app.listen(8000, () => {
    console.log('App listening at port 8000')
})