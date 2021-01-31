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
            password: await generateHash(password),
            first_name: firstName,
            last_name: lastName
        });

        await newUser.save();
        return response.json(newUser);
    } catch (e) {
        return response.status(500).json(e);
    }

};


export const login = (request, response) => {
    const validation = validateLogin(request.body.payload);

    if(validation.error) {
        return response.status(400).json(validation.error);
    }

    const email = request.body.payload.email;
    const password = request.body.payload.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found';
                return response.status(404).json(errors);
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                        };
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if(err) {
                                console.error('There is some error in token', err);
                            } else {
                                response.json({
                                    success: true,
                                    token: `${token}`
                                });
                            }
                        });
                    } else {
                        errors.password = 'Incorrect Password';
                        return response.status(400).json(errors);
                    }
                });
        });
};