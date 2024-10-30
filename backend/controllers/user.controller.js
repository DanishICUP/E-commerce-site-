import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from "../models/user.model.js";

//create token using jwt
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const UserLogin = async (req, res) => {
    try {
        const {email , password} = req.body;
        //cheking user is avaliable ?
        const user = await userModel.findOne({email});
        if (!user) {
            res.json({success:false,message:'user does not exist !'})
        }
        //password comaprision with hash password
        const isMatch = await bcrypt.compare(password , user.password)
        if (isMatch) {
            const token = createToken(user._id)
            res.json({success:true,token,message:"user login successfully"})
        }else{
            res.json({success:false,message:'invalid credentials'})
        }

    } catch (error) {
        console.log("User login Error:",error);
        res.json({success:false,message:error.message})
    }
}

//Route for user register
const UserRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // console.log(req.body.email);

        //check user already exists ?
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: 'User Already exists!' })
        }

        //validating email name and strong password using validator
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'please enter valid email !' })
        }
        
        
        if (password.length < 8) {
            res.json({ success: false, message: 'please Atleast 8 character use spacial character' })
        }

        //hash password using bcrypt and salt
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //register user
        const newUser = new userModel({
            name,
            email,
            password: hashPassword
        });
        const user = await newUser.save()

        //create token for authentic user
        const token = createToken(user._id)
        res.json({ success: true, token });


    } catch (error) {
        console.log("user registration Error:",error);
        res.json({success:false,message:error.message});
    }
}
//Route for admin Login
const AdminLogin = async (req, res) => {
    try {
        const {email,password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            //in this case generate one token for admin user
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token,message:"Admin Login Successfully"})
        }else{
            res.json({success:false,message:"invalid Credentials"})
        }
    } catch (error) {
        console.log("Admin login Error:",error);
        res.json({success:false,message:error.message});
    }
}

export { UserLogin, UserRegister, AdminLogin }