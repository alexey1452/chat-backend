import joi from 'joi'

const loginSchema = joi.object().keys({
    email: joi.string().email({ minDomainAtoms: 2 }),
    password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});


const validateLogin = async (data) => {
    return joi.validate(data, loginSchema);
};

export default validateLogin;
