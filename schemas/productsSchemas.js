const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const CONFLICT = 409;
const UNPROCESSABLE_ENTITY = 422;

// Referencia: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

const nameBlank = '"name" is required';
const nameLength = '"name" length must be at least 5 characters long';
const quantityBlank = '"quantity" is required';
const quantityValid = '"quantity" must be a number larger than or equal to 1';
const existProduct = 'Product already exists';
const notFound = 'Product not found';
const productIdBlank = '"product_id" is required';
const saleNotFound = 'Sale not found';

const blankName = (value) => (!value);
const isLengthLetterThan = (value, min) => (value.length < min);
const blankQuantity = (value) => (value === undefined);
const valid = (value) => (value < 1 || !Number.isInteger(value));
const blankProductId = (value) => (value === undefined);

const validateProducts = (name, quantity) => {
    switch (true) {
        case blankName(name): return { code: BAD_REQUEST, message: nameBlank };
        case isLengthLetterThan(name, 5): return {
             code: UNPROCESSABLE_ENTITY, message: nameLength };
        case blankQuantity(quantity): return {
             code: BAD_REQUEST, message: quantityBlank };
        case valid(quantity): return {
             code: UNPROCESSABLE_ENTITY, message: quantityValid };
        default:
            return {};
    }
};

const validateSales = (productId, quantity) => {
    switch (true) {
        case blankProductId(productId): return {
             code: BAD_REQUEST, message: productIdBlank };
        case blankQuantity(quantity): return {
             code: BAD_REQUEST, message: quantityBlank };
        case valid(quantity): return {
             code: UNPROCESSABLE_ENTITY, message: quantityValid };
        default:
            return {};
    }
};

module.exports = { 
    validateProducts,
    validateSales,
    OK,
    CREATED,
    NOT_FOUND,
    CONFLICT,
    existProduct,
    notFound,
    saleNotFound,
};
