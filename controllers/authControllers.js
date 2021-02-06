import User from "../models/user";
import { generateHash } from "../utils/helpers";
import validateRegisterUser from "../validation/registerUserValidation";
import validateLogin from "../validation/loginValidation";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const registerUser = async (request, response) => {
    const { email, password, firstName, lastName } = request.body.payload;

    try {
        const user = await User.findOne({ email: email })
        if(user) {
            return response.status(400).json({error: "This email already exits"});
        }

        const validation = validateRegisterUser(request.body.payload)
        if(validation.error) {
            return response.status(400).json(validation.error);
        }

        const newUser = new User({
            email,
            firstName,
            lastName,
            password: await generateHash(password),
        });

        await newUser.save();
        return response.json(newUser);
    } catch (e) {
        return response.status(500).json(e);
    }

};

export const login = async (request, response) => {
    const validation = validateLogin(request.body.payload);
    const { email, password } = request.body.payload;
    const user = await User.findOne({email});

    if(validation.error) {
        return response.status(400).json(validation.error);
    }

    if(!user) {
        return response.status(404).json({ email: 'User not found' });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
        if(isMatch) {
            const payload = {
                id: user._id,
                email: user.email,
            };
            jwt.sign(payload, 'secret', { expiresIn: 60 * 60 * 24}, (err, token) => {
                if(err) {
                    console.error('There is some error in token', err);
                } else {
                    response.json({
                        user,
                        success: true,
                        token: token,
                    });
                }
            });
        } else {
            return response.status(400).json({ password: 'Incorrect Password' });
        }
    });
};