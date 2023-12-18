const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const router = express.Router();

router.post("/createuser", async (req, res) => {
  try {
    // Assuming request body contains user data (e.g., username, email, password)
    const { name, email, password, age } = req.body;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(existingUser);
      return res
        .status(400)
        .json({ status: false, error: "User already exists" });
    }

    // If the user does not exist, create a new user
    const enrollment_date = new Date();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: name,
        email,
        password: hashedPassword, 
        age: parseInt(age),
        enrollment_date,
      },
    });

    // console.log(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma
  }
});

module.exports = router;