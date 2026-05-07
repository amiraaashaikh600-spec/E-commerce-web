const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const Stripe = require("stripe");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');

dotenv.config();

const app = express();

// Stripe setup
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Import User Model
const User = require('./models/User');

/* ---------------- MIDDLEWARE ---------------- */

// CORS (React + backend support)
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));

// JSON parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key_here',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,  // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Static files
app.use(express.static("public"));
app.use("/assets", express.static("assets"));

// MongoDB Connection (FIXED - removed deprecated options)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/evo_perfume')
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

/* ---------------- EJS SETUP ---------------- */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

/* ---------------- ROUTES ---------------- */

// Home page (protected)
app.get("/", isAuthenticated, (req, res) => {
    res.render("full", { user: req.session });
});

// Full page (protected)
app.get("/full", isAuthenticated, (req, res) => {
    res.render("full", { user: req.session });
});

// Register page
app.get("/register", (req, res) => {
    if (req.session.userId) {
        return res.redirect("/full");
    }
    res.render("register");
});

// Register API endpoint
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        
        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required" 
            });
        }
        
        if (password !== confirmPassword) {
            return res.status(400).json({ 
                success: false, 
                message: "Passwords do not match" 
            });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ 
                success: false, 
                message: "Password must be at least 6 characters" 
            });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: "Email already registered" 
            });
        }
        
        // Create new user
        const user = new User({
            fullName: name,
            email: email,
            password: password
        });
        
        await user.save();
        
        // Auto-login after registration
        req.session.userId = user._id;
        req.session.userEmail = user.email;
        req.session.userName = user.fullName;
        
        res.json({ 
            success: true, 
            message: "Registration successful!",
            redirect: "/full"
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Registration failed. Please try again." 
        });
    }
});

// Regular POST route for form submission (if using traditional form)
app.post("/register", async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        
        if (password !== confirmPassword) {
            return res.send("Passwords do not match");
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send("Email already registered. Please login.");
        }
        
        const user = new User({
            fullName: name,
            email: email,
            password: password
        });
        
        await user.save();
        
        req.session.userId = user._id;
        req.session.userEmail = user.email;
        req.session.userName = user.fullName;
        
        res.redirect("/full");
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Registration failed");
    }
});

// Login page
app.get("/login", (req, res) => {
    if (req.session.userId) {
        return res.redirect("/full");
    }
    res.render("login");
});

// Login API endpoint
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Email and password are required" 
            });
        }
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid email or password" 
            });
        }
        
        // Check password
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid email or password" 
            });
        }
        
        user.lastLogin = new Date();
        await user.save();
        
        // Create session
        req.session.userId = user._id;
        req.session.userEmail = user.email;
        req.session.userName = user.fullName;
        
        res.json({ 
            success: true, 
            message: "Login successful!",
            redirect: "/full"
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Login failed. Please try again." 
        });
    }
});

// Regular POST route for form submission
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.send("Invalid email or password");
        }
        
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.send("Invalid email or password");
        }
        
        req.session.userId = user._id;
        req.session.userEmail = user.email;
        req.session.userName = user.fullName;
        
        res.redirect("/full");
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Login failed");
    }
});

// Logout endpoint
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Logout failed");
        }
        res.redirect("/login");
    });
});

app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Logout failed" });
        }
        res.json({ success: true, redirect: "/login" });
    });
});

// Get user info endpoint
app.get("/api/user", isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId).select('-password');
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching user" });
    }
});

/* ---------------- STRIPE PAYMENT ---------------- */

app.post("/create-checkout-session", async (req, res) => {
    try {
        const { product } = req.body;

        if (!product) {
            return res.status(400).json({ error: "Product data missing" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name,
                            images: product.image ? [product.image] : [],
                        },
                        unit_amount: Math.round(product.price * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/success`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cancel`,
        });

        return res.json({ url: session.url });

    } catch (error) {
        console.error("Stripe Error:", error.message);
        return res.status(500).json({ error: error.message });
    }
});

/* ---------------- SERVER START ---------------- */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Register: http://localhost:${PORT}/register`);
    console.log(`🔐 Login: http://localhost:${PORT}/login`);
    console.log(`🏠 Home: http://localhost:${PORT}/full`);
});