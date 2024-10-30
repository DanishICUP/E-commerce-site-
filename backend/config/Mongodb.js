import mongoose from 'mongoose'

const connectdb = async () => {
    try {

        mongoose.connection.on('connected',()=>{
            console.log('Db Connected...');
            
        })
        await mongoose.connect(`${process.env.MONGO_URI}/e-Commerce`);
    } catch (error) {
        console.error("Db connection error !!",error);
    }
}

export default connectdb