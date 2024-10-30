import userModel from "../models/user.model.js";


//add product to user cart
const addProduct = async (req,res) => {

    try {
        const {userId , itemid , size} = req.body;
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        
        if (cartData[itemid]) {
            if (cartData[itemid][size]) {
                cartData[itemid][size] += 1
            }else{
                cartData[itemid][size] = 1
            }
        }else{
            cartData[itemid] = {}
            cartData[itemid][size] = 1
        }

        await userModel.findByIdAndUpdate(userId , {cartData})

        res.json({success:true,message:"add to cart data"})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
    

}

//add update user cart
const updateCart = async (req,res) => {
    try {
        const {userId , itemid , size , quantity} = req.body;
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        cartData[itemid][size] = quantity

        await userModel.findByIdAndUpdate(userId , {cartData})

        res.json({success:true,message:"Cart Data Updated"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//show user Cart
const getUserCart = async (req,res) => {
    try {
        const {userId} = req.body;

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        res.json({success:true,cartData})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {addProduct , updateCart , getUserCart}
