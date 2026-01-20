import express from 'express'
import { upsertCartController} from '../../controller/cart/index.js'
const router=express.Router()
// router.post('/:id',createCartController)
// router.patch('/:id',updateCartController)
// router.delete('/:id',deleteCartController)


router.patch('/',upsertCartController)

export default router