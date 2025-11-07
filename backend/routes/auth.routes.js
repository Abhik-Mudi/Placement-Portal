import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { login, logout, signup } from '../controllers/auth.controller.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 
import generateToken from '../utils/generateToken.js';

const authRouter = express.Router();

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback"
}, 
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
            return done(null, user);
        } else {
            const newUser = new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                username: profile.displayName,
            });
            await newUser.save();
            return done(null, newUser);
        }
    } catch (error) {
        return done(error, null);
    }
}));

authRouter.get('/google', 
    passport.authenticate('google', { 
        scope: ['profile', 'email'], 
        session: false ,
        prompt: 'select_account'
    })
);

authRouter.get('/google/callback', 
    passport.authenticate('google', { 
        session: false, 
        failureRedirect: 'http://localhost:3000/login-failed' 
    }),
    (req, res) => {
        generateToken(req.user._id, res)
        res.redirect('http://localhost:3000/login');
    }
);

authRouter.get('/me', (req, res) => {
    try {
        const token = req.cookies.placement;
        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ user: decoded });

    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.post('/logout', logout)

export default authRouter;