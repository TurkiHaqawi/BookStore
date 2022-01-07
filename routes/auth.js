const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: passwordHash
        })

        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})


router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(400).json("Wrong credential!")

        const passValidated = await bcrypt.compare(req.body.password, user.password)
        !passValidated && res.status(400).json("Wrong credential!")

        
        const accessToken = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.SECRET_KEY, {expiresIn: "2m"})
        
        res.status(200).json({
            accessToken,
        })
        
    } catch (err) {
        res.status(500).json(err)
    }
    
})




module.exports = router;



