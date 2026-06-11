const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { registerRule, validation, loginRule } = require('../middleware/validator');
const isAuth = require('../middleware/passport');
// router.get('/', (req, res) => {
//     res.send('hello');
// });



//register
router.post('/register',registerRule(),validation, async (req, res) => {
    const { fullname, email, password } = req.body;

    try {

        const newUser = new User({
            fullname,
            email,
            password
        });
        //check if email exist
        const searchedUser = await User.findOne({ email });
        if (searchedUser) {
            return res.status(400).send({ message: 'Email already exists' });
        }


        //hash password
        const salt =10
        const gensalt = await bcrypt.genSalt(salt);
        const hash = await bcrypt.hash(password, gensalt);
        console.log(hash);
        newUser.password = hash;

       // ceate token
       const newUserToken = await newUser.save();
       const payload = {
        _id: newUser._id,
         }
            const token = jwt.sign(payload, process.env.SecretOrKey, { expiresIn: '1h' });
       
        //save user
        await newUser.save();

        res.status(200).json({ newUser, message: 'User created successfully', token: `Bearer ${token}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//login
router.post('/login', loginRule(), validation, async (req, res) => {
    const { email, password } = req.body;
    try {
       
        //check if user exist
      

        const searchedUser = await User.findOne({ email });
        // if the email is not exist
        if (!searchedUser) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }
        //check if the password is correct

        const Match = await bcrypt.compare(password, searchedUser.password);
        
        if (!Match) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        // creeate token
        const payload = {
            _id: searchedUser._id,
        }
        const token = jwt.sign(payload, process.env.SecretOrKey, { expiresIn: '1h' });
        console.log(token);
        
        //send the user
        res.status(200).send({ user: searchedUser, message: 'Login successful', token: `Bearer ${token}` });

        

       
    } catch (error) {
        res.status(500).send({ message: 'can not get the user' });
    }
});


router.get('/current', isAuth(), (req, res) => {
    try {
        res.status(200).send({ user: req.user });
    } catch (error) {
        res.status(500).send({ message: 'can not get the user' });
    }
});


//get all users

router.get("/", async (req, res) => {
    try {

        let result = await User.find();
        res.send({ users: result, msg: "all users" })

    } catch (error) {
        console.log(error)
    }

})



//find user By Id


router.get("/:id", async (req, res) => {
    try {

        let result = await User.findById(req.params.id);
        res.send({ user: result, msg: "one user" })

    } catch (error) {
        console.log(error)
    }

})




//delete user

router.delete("/:id", async (req, res) => {
    try {

        let result = await User.findByIdAndDelete(req.params.id);
        res.send({ msg: "user is deleted" })

    } catch (error) {
        console.log(error)
    }

})


//edit user

router.put("/:id", async (req, res) => {
    try {

        let result = await User.findByIdAndUpdate(
            { _id: req.params.id }, { $set: { ...req.body } }
        );
        res.send({ msg: "user is edited" })


    } catch (error) {
        console.log(error)
    }

})





module.exports = router;