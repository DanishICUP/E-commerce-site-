import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/product.model.js'

//function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subcategory, sizes, bestSeller } = req.body;


        // Image in req.files
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        // Create array of images (1, 2, 3, or 4 images based on your choice)
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // Upload images to Cloudinary and get URIs to store in the database
        let imageUri = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // Prepare product data for MongoDB
        const productData = {
            name,
            description,
            price: Number(price),
            image: imageUri,
            category,
            subcategory,
            bestSeller: bestSeller === 'true',
            sizes: Array.isArray(sizes) ? sizes : JSON.stringify(sizes || '[]'),
            date: Date.now(),
        };
        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        // Send success response
        res.json({ success: true, message: "Product Data Added Successfully ..." });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error while uploading ..." });
    }
};

//function for list product
const listProduct = async (req, res) => {
    try {
        const product = await productModel.find({})
        res.json({success:true,product});
    } catch (error) {
        console.error(error);
        res.json({success:false,message:error.message})
    }
}

//function for removeing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Item delete ..."})
    } catch (error) {
        console.error(error);
        res.json({success:false,message:error.message})
    }
}

//function for single product info
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true,product})
    } catch (error) {
        console.error(error);
        res.json({success:false,message:error.message})
    }
}

export { addProduct, listProduct, removeProduct, singleProduct }