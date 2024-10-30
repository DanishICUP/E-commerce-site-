import express from 'express'
import { addProduct , updateCart , getUserCart } from '../controllers/cartController.js'
import authUser from '../middleware/auth.js'

const UserCart = express.Router()

UserCart.post('/get',authUser , getUserCart)
UserCart.post('/add',authUser , addProduct)
UserCart.post('/update',authUser , updateCart)


export default UserCart

