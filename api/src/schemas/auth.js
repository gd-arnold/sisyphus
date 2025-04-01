import Joi from "joi";

const email = Joi.string()
    .email()
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
        .min(8)
        .required()
    }).required(),

    login: Joi.object({
        email,
        password: Joi.string().required()
    }).required()
};

export default AuthSchema;
