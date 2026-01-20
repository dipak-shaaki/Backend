import express from 'express'
import { upsertCartController, getCartController, deleteCartItemController } from '../../controller/cart/index.js'
const router = express.Router()

router.get('/', getCartController)
router.patch('/', upsertCartController)
router.delete('/:id', deleteCartItemController)

export default router
