const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult} = require('express-validator');
const config = require('config');
const User = require('../models/User');

const router = Router()

router.post(
    '/register',
    [
        check('email', 'Email isn\'t correct').isEmail(),
        check('password', 'Minimal password lenght 6 symbols').isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Data isn\'t correct',
                })
            }
            const { email, password } = req.body;
            const candidate = await User.findOne({ email});
            if (candidate) {
                res.status(400).json({ message: 'This user already exist'});
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword});
            await user.save();
            res.status(201).json({ message: 'User is created'});
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again later'});
        }
    }
);

router.post(
    '/login',
    [
        check('email', 'Enter your email').normalizeEmail().isEmail(),
        check('password', 'Enter your password').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Data isn\'t correct',
                })
            }
            const { email, password } = req.body;
            const user = await User.findOne({ email});
            if (!user) {
                res.status(400).json({ message: 'This user isn\'t find' });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ message: 'Password isn\'t correct' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            );

            res.json({ token, userId: user.id });
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again later' });
        }
    }
);

module.exports = router;
