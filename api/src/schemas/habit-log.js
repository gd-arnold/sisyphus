import Joi from "joi";

const HabitLogSchema = Joi.object({
    id: Joi.number()
    .integer()
    .positive()
    .required(),

    date: Joi.date()
    .iso()
    .max("now")
    .required(),
})

export default HabitLogSchema;
