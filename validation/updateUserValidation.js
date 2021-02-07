import joi from 'joi'

const updateUserSchema = joi.object().keys({
    firstName: joi.string().alphanum().min(3).max(70),
    lastName: joi.string().alphanum().min(3).max(70),
    email: joi.string().email({ minDomainAtoms: 2 }),
    password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
});


const validateUpdateUser = async (data) => {
    return joi.validate(data, updateUserSchema);
};

export default validateUpdateUser;
