export const validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error)
            return res.status(400).send(error);

        next();
    };
}

export const validateParams = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params);

        if (error)
            return res.status(400).send(error);

        next();
    }
}
