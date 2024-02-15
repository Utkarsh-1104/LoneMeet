require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/order', async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const options = req.body;
        const order = await razorpay.orders.create(options);
        
        if (!order) return res.status(500).send('Some error occured');
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(5000, () => {
    console.log('Server is running on : http://localhost:5000');
})