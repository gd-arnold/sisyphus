import Joi from "joi";

const email = Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu', 'gov', 'io', 'co'] } })
    .required()
    .trim()
    .lowercase();

const AuthSchema = {
    register: Joi.object({
        email, 

        username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .trim(),

        password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
    }).required(),

    login: Joi.object({
        email,
        password: Joi.string().required()
    }).required()
}

export default AuthSchema;
