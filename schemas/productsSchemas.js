const code = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    };

// Referencia: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

const errors = {
    nameBlank: '"name" is required',
    nameLength: '"name" length must be at least 5 characters long',
    quantityBlank: '"quantity" is required',
    quantityValid: '"quantity" must be a number larger than or equal to 1',
    existProduct: 'Product already exists',
};

const blankName = (value) => (!value);
const isLengthLetterThan = (value, min) => (value.length < min);
const blankQuantity = (value) => (value === undefined);
const valid = (value) => (value < 1 || !Number.isInteger(value));

const validate = (name, quantity) => {
    switch (true) {
        case blankName(name): return { code: code.BAD_REQUEST, message: errors.nameBlank };
        case isLengthLetterThan(name, 5): return {
             code: code.UNPROCESSABLE_ENTITY, message: errors.nameLength };
        case blankQuantity(quantity): return {
             code: code.BAD_REQUEST, message: errors.quantityBlank };
        case valid(quantity): return {
             code: code.UNPROCESSABLE_ENTITY, message: errors.quantityValid };
        default:
            return {};
    }
};

module.exports = { 
    validate,
    code,
    errors,
};
