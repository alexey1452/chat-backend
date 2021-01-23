import User from "../models/user";
import { generateHash } from "../utils/helpers";
import validateRegisterUser from "../validation/registerUserValidation";

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
