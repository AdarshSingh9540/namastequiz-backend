const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User } = require("../db/db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_jwt_secret_here";

// Validation schema using Zod
const signupBody = zod.object({
    email: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

// Route for user signup
router.post("/signup", async (req, res) => {
    try {
        // Validate request body
        const { success, data } = signupBody.safeParse(req.body);

        if (!success) {
            let errors = {};
            if (data) {
                errors = data.errors;
            }
            return res.status(400).json({
                message: "Invalid input data",
                errors: errors
            });
        }

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email: data.email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already taken"
            });
        }

        // Create a new user
        const user = await User.create({
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
        });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        // Return success response
        res.status(201).json({
            message: "User created successfully",
            token: token,
            user: {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            message: "Server error while creating user"
        });
    }
});

module.exports = router;
