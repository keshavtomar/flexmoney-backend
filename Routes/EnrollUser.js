const express = require("express");
const { DateTime } = require('luxon');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { log } = require("console");

const prisma = new PrismaClient();

function calculateAge(dob) {
  const dobDate = new Date(dob);
  const currentDate = new Date();

  // Calculate the difference in years
  const age = currentDate.getFullYear() - dobDate.getFullYear();

  // Check if birthday has occurred this year
  if (
    currentDate.getMonth() < dobDate.getMonth() ||
    (currentDate.getMonth() === dobDate.getMonth() &&
      currentDate.getDate() < dobDate.getDate())
  ) {
    // If birthday hasn't occurred yet, decrement age by 1
    return age - 1;
  }

  return age;
}


router.post("/enrolluser", async (req, res) => {
  try {
    const { user_id, batch } = req.body;
    const amount = 500; // Assuming a fixed amount for payment
    const classid = parseInt(batch);
    const userid = parseInt(user_id);

    console.log(user_id);

    const user = await prisma.user.findUnique({
      where: {
        user_id: userid,
      },
    });

    const x = user.dateOfBirth.toString();
    const age = calculateAge(x);

    if(age<18||age>60){
      return res.status(205).json({ success: false, message: "Age not eligible" });
    }
    else{

      const paymentEntry = await prisma.payment.create({
        data: {
          user_id: userid,
          class_id: classid,
          amount: 500,
          payment_date: new Date(),
        },
      });
  
      console.log("Payment entry created:", paymentEntry);
      res.json({ success: true, message: "Payment successful" });
    }

  } catch (error) {
    console.error("Error making payment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
});

module.exports = router;
