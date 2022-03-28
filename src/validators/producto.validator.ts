import joi from "joi";

// define esquema producto Get
export const schemaProductoGet = joi.object().keys({
    id: joi.number().required()
})

// define esquema producto Post

