import User from "../models/user";
import validateUpdateUser from "../validation/updateUserValidation";
import {generateHash} from "../utils/helpers";

export const getUser = async (request, response) => {
    try {
        const { id } = request.user;
        const user = await User.findById(id)

        if(!user) {
            return response.status(404).json({ msg: 'User did not found' })
        }

        return response.json(user);
    } catch (e) {
        return response.status(500).json(e);
    }
};

export const updateUser = async (request, response) => {
    try {
        const { data, userId } = request.body.payload;

        const validation = validateUpdateUser(data)
        if(validation.error) {
            return response.status(400).json(validation.error);
        }

        if(data.password) {
            data.password = await generateHash(data.password)
        }

        User.findOneAndUpdate({ _id: userId }, data, { new: true, useFindAndModify: false }, (error,user) => {
            if(error){
                return response.json({msg: `Some Error: ${error}`});
            }

            if(!user) {
                response.status(404).json({ msg: "User did not found" })
            }

            return response.json(user);
        })
    } catch (e) {
        return response.status(500).json(e);
    }
};