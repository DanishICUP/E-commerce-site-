import OrderModel from "../models/order.model.js"


//place order using cod method
const PlaceOrder = async (req, res) => {

    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'cod',
            payment: false,
            date: Date.now()
        }

        const newOrder = new OrderModel(orderData);
        await newOrder.save()

        await OrderModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "order placed Successfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

//place order using stripe method
const stripe = async () => {

}

//all order data for admin panel
const allOrders = async (req,res) => {
    try {
        const order = await OrderModel.find({})
        res.json({success:true,order})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message:error.message })
    }
}

//user data for frontend
const userOrder = async (req, res) => {

    try {
        const { userId } = req.body

        const orders = await OrderModel.find({ userId })
        res.json({ success: true, orders })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message:error.message })
    }
}

//update order status from admin panel
const updateStatus = async (req,res) => {
     try {
        const {orderId , status} = req.body;

        await OrderModel.findByIdAndUpdate(orderId , {status})
        res.json({success:true,message:"status updated"})
     } catch (error) {
        console.log(error);
        res.json({ success: false, message:error.message })
     }
}


export { PlaceOrder, allOrders, userOrder, updateStatus, stripe }