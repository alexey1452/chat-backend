import joi from 'joi'

const createGroupSchema = joi.object().keys({
    title: joi.string().alphanum().min(3).max(70).required(),
    ownerId: joi.required(),
});


const validateCreateGroup = async (data) => {
    return joi.validate(data, createGroupSchema);
};

export default validateCreateGroup;
