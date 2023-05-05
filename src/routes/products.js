import { Router } from "express";
import { check } from "express-validator";
import inputsValidation from "../middlewares/inputsValidate.js";
import { codeExist, productExist } from "../helpers/dbValidators.js";
import { getProducts, getProductById, postProduct, putProduct, deleteProduct } from "../controller/product.js";

const router = Router();

router.get('/', getProducts);

router.get('/:pid', [
    check('pid', 'No es un id valido').isMongoId(),
    check('pid').custom(productExist).escape(),
    inputsValidation
], getProductById);

router.post('/', [
    check('title', 'El titulo es obligatorio').trim().notEmpty().escape(),
    check('description', 'La descripcion es obligatorio').trim().notEmpty().escape(),
    check('code', 'El codigo es obligatorio').trim().notEmpty().custom(codeExist).escape(),
    check('stock', 'El stock es obligatorio').trim().escape(),
    check('category', 'La categoria es obligatorio').trim().notEmpty().escape(),
    inputsValidation
], postProduct);

router.put('/:pid', [
    check('pid', 'No es un id valido').isMongoId(),
    check('pid').custom(productExist).escape(),
    check('title', 'El titulo es obligatorio').trim().notEmpty().escape(),
    check('description', 'La descripcion es obligatorio').trim().notEmpty().escape(),
    check('code', 'El codigo es obligatorio').notEmpty().escape(),
    check('stock', 'El stock es obligatorio').notEmpty().escape(),
    check('category', 'La categoria es obligatorio').trim().notEmpty().escape(),
    inputsValidation
], putProduct);

router.delete('/:pid', [
    check('pid', 'No es un id valido').isMongoId(),
    check('pid').custom(productExist).escape(),
    inputsValidation
], deleteProduct);

export default router;