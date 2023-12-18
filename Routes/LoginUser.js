const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const router = express.Router();

router.post('/loginuser', async (req, res) => {
  try {
    // Assuming request body contains email and password
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
        console.log("Email doesn't exist");
      return res.status(403).json({ error: 'Email does not exist' });
    }

    // Validate the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        console.log("not matched");
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log();
    
    res.status(200).json({ message: 'Login successful', user:user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect(); 
  }
});

module.exports = router;
