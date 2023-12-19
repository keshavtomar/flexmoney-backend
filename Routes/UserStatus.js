const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { userInfo } = require('os');

const prisma = new PrismaClient();
const router = express.Router();

router.post('/userstatus', async (req, res) => {
  try {
    // Assuming request body contains email and password
    const { user_id } = req.body;
    const find = parseInt(user_id);

    // Check if the user with the provided email exists
    const user = await prisma.payment.findMany({
      where: { user_id:find },
    });

    if (!user) {
      return res.json({ paid:false });
    }
    else{
        res.json({paid:true});
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect(); 
  }
});

module.exports = router;
