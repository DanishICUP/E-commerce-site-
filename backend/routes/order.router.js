import express from 'express'
import { PlaceOrder , allOrders , userOrder , updateStatus ,stripe } from '../controllers/order.controller.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const OrderRouter = express.Router()

//admin featuers
OrderRouter.post('/list',adminAuth,allOrders)
OrderRouter.post('/status',adminAuth,updateStatus)

//payment features
OrderRouter.post('/place',authUser,PlaceOrder)
OrderRouter.post('/stripe',authUser,stripe)

//user features
OrderRouter.post('/userorder',authUser,userOrder)


export default OrderRouter