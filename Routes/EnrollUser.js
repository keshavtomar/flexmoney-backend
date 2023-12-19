const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/enrolluser', async (req, res) => {
  try {
    const { user_id, batch } = req.body;
    const amount = 500; // Assuming a fixed amount for payment
    const classid = parseInt(batch);
    const userid = parseInt(user_id);


    // checking if payment is already done for this month

    // Create a payment entry in the database using Prisma


    const paymentEntry = await prisma.payment.create({
      data: {
        user_id:userid,
        class_id:classid,
        amount:500,
        payment_date: new Date(), 
      },
    });

    console.log('Payment entry created:', paymentEntry);

    res.json({ success: true, message: 'Payment successful' });
  } catch (error) {
    console.error('Error making payment:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
});

module.exports = router;
