import Joi from "joi";

const IdParamSchema = Joi.object({
    id: Joi.number()
    .integer()
    .positive()
    .required()
}).required();

export default IdParamSchema;
