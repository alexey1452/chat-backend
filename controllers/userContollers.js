import User from "../models/user";

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