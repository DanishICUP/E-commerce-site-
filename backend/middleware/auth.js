import jwt from 'jsonwebtoken'

const authUser = (req,res,next) => {

    const {token} = req.headers;

    if (!token) {
        return  res.json({success:false,message:'not autorized login please'})
    }

    try {
        //verify token
        const decode_token = jwt.verify(token , process.env.JWT_SECRET)
        req.body.userId = decode_token.id
        next()

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export default authUser