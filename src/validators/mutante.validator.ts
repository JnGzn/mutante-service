import joi from "joi";

// define esquema producto POST
export const schemaMutantePost = joi.object().keys({
    dna: joi.array().required()
})


