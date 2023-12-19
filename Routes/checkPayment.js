const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/checkpayment', async (req, res) => {
  try {
    const { user_id } = req.body;
    const parsedDate = new Date();
    // console.log("Here we go");
    
    // Get the month and year from the provided date
    const month = parsedDate.getMonth() + 1; // Month is zero-based, so add 1
    const year = parsedDate.getFullYear();
    const uid = parseInt(user_id);

    // Check if there is a payment entry for the specified user, month, and year
    const existingPayment = await prisma.payment.findFirst({
      where: {
        user_id:uid,
        payment_date: {
          gte: new Date(`${year}-${month}-01T00:00:00Z`), // Start of the month
          lt: new Date(
            month === 12
              ? `${year + 1}-01-01T00:00:00Z`
              : `${year}-${month + 1}-01T00:00:00Z`
          )
        },
      },
    });

    if(existingPayment===null){
        return res.json({success:true, paid: false});
    }

    console.log(existingPayment);

    const x = new Date(
        month === 12
          ? `${year + 1}-01-01T00:00:00Z`
          : `${year}-${month + 1}-01T00:00:00Z`
      );

    const hasPayment = !!existingPayment;

    res.json({ success: true, paid: hasPayment, nextdue: x, batch:existingPayment.class_id });
  } catch (error) {
    console.error('Error checking payment:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
});

module.exports = router;
