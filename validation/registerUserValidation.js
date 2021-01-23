import joi from 'joi'

const registerUserSchema = joi.object().keys({
    firstName: joi.string().alphanum().min(3).max(70).required(),
    lastName: joi.string().alphanum().min(3).max(70).required(),
    email: joi.string().email({ minDomainAtoms: 2 }),
    password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});


const validateRegisterUser = async (data) => {
    return joi.validate(data, registerUserSchema);
};

export default validateRegisterUser;
