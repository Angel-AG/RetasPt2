import express from "express";
import asyncHandler from "express-async-handler";
import RetaController from "./RetaController";
import { getUser, isLoggedIn } from "../../middleware/checkAuth";

const router = express.Router({mergeParams: true});

router.post('/', asyncHandler(isLoggedIn), asyncHandler(RetaController.create()))
router.delete('/', asyncHandler(isLoggedIn), asyncHandler(RetaController.delete()));
router.put('/', asyncHandler(isLoggedIn), asyncHandler(RetaController.update()));
router.get('/get_all_by_category/:category', asyncHandler(RetaController.getRetasByCategory()));
router.get('/get_by_query', asyncHandler(RetaController.getRetasBySearchBarQuery()))
router.get('/:retaId', getUser, asyncHandler(RetaController.readOne(false)));
router.get('/edit_reta/:retaId', asyncHandler(isLoggedIn), asyncHandler(RetaController.readOne(true)));

export default router;