import Joi from "joi";

const HabitSchema = Joi.object({
    title: Joi.string()
    .alphanum()
    .min(1)
    .max(255)
    .required()
}).required();

export default HabitSchema;
