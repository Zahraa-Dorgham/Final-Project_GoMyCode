const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { registerRule, validation, loginRule } = require("../middleware/validator");
const isAuth = require("../middleware/passport");

//  REGISTER
router.post("/register", registerRule(), validation, async (req, res) => {
    const { fullname, email, password, phone } = req.body;

    try {
        // check email exist
        const searchedUser = await User.findOne({ email });
        if (searchedUser) {
            return res.status(400).send({ message: "Email already exists" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            phone,
            role: "user"
        });

        await newUser.save();

        // token
        const payload = {
            _id: newUser._id,
            role: newUser.role
        };

        const token = jwt.sign(payload, process.env.SecretOrKey, {
            expiresIn: "1h"
        });

        res.status(200).json({
            user: newUser,
            message: "User created successfully",
            token: `Bearer ${token}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


//  LOGIN
router.post("/login", loginRule(), validation, async (req, res) => {
    const { email, password } = req.body;

    try {
        const searchedUser = await User.findOne({ email });

        if (!searchedUser) {
            return res.status(400).send({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, searchedUser.password);

        if (!isMatch) {
            return res.status(400).send({ message: "Invalid credentials" });
        }

        const payload = {
            _id: searchedUser._id,
            role: searchedUser.role
        };

        const token = jwt.sign(payload, process.env.SecretOrKey, {
            expiresIn: "1h"
        });

        res.status(200).send({
            user: searchedUser,
            message: "Login successful",
            token: `Bearer ${token}`
        });
    } catch (error) {
        res.status(500).send({ message: "Cannot login user" });
    }
});


// CURRENT USER
router.get("/current", isAuth(), (req, res) => {
    try {
        res.status(200).send({ user: req.user });
    } catch (error) {
        res.status(500).send({ message: "Cannot get user" });
    }
});


//  GET ALL USERS
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.send({ users, msg: "all users" });
    } catch (error) {
        res.status(500).send(error);
    }
});


//  GET BY ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send({ user, msg: "one user" });
    } catch (error) {
        res.status(500).send(error);
    }
});


// DELETE USER
router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.send({ msg: "user deleted" });
    } catch (error) {
        res.status(500).send(error);
    }
});


// UPDATE USER
router.put("/:id", async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });

        res.send({ msg: "user updated" });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;