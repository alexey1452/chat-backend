import GroupSchema from "../models/group";
import validateCreateGroup from "../validation/groupCreateValidation";

export const createGroup = async (request, response) => {
    const { title, ownerId } = request.body.payload;

    try {
        const validation = validateCreateGroup(request.body.payload)
        if(validation.error) {
            return response.status(400).json(validation.error);
        }

        const newGroup = new GroupSchema({
            title,
            ownerId
        });

        await newGroup.save();
        return response.json(newGroup);
    } catch (e) {
        return response.status(500).json(e);
    }

};