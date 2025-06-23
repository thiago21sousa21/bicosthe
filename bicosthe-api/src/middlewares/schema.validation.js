
export function schemaValidation (schema){
    return (req, res, next )=>{
        const validation = schema.validate(req.body , {abortEarly: false});
        if ( validation.error){
            const errors = validation.error.details.map(detail => detail.message);
            console.log(errors, "estou caindo em schemaValidation");
            return res.status(422).send(errors);
        }
        next();       
    }
}