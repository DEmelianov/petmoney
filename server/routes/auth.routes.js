const {Router} = require('express')
const router = Router()
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config')

router.post(
    '/register',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Password min length is 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const validationErrors = validationResult(req)
            if (!validationErrors.isEmpty()) {
                return res.status(400).json({
                    errors: validationErrors.array(),
                    message: 'Registration error'
                })
            }

            const {email, password} = req.body
            const isUserExist = await User.findOne({email})

            if (isUserExist) {
                return res.status(400).json({message: 'User exist'})
            }

            const cryptoPassword = await bcrypt.hash(password, 12);
            const newUser = new User({email, password: cryptoPassword})

            await newUser.save()

            res.status(201).json({message: 'New user created'})

        } catch (e) {
            res.status(500).json({message: `Error. Please try again later ${e}`})
        }
    })

router.post(
    '/login',
    [
        check('email', 'Wrong email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const validationErrors = validationResult(req)
            if (!validationErrors.isEmpty()) {
                return res.status(400).json({
                    errors: validationErrors.array(),
                    message: 'Login error'
                })
            }

            const {email, password} = req.body
            const user = await User.findOne({email})

            if (!user) {
                res.status(400).json({message: 'User not found'})
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password)

            if (!isPasswordMatch) {
                res.status(400).json({message: 'Password wrong'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.app.jwtSecretKey,
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: `Error. Please try again later ${e}`})
        }
    })

module.exports = router