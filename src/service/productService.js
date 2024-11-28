import mongoose from "mongoose";
import productschema from "../schema/db/productSchema.js"

const Product = mongoose.model("Product", productschema);

export class ProductService {

    async getAllProducts() {
        try {
            const products = await Product.find();
            return products;
        } catch (error) {
            return error;
        }
    }
    async createProduct(product) {
        try {
            const newProduct = new Product(product);
            console.log(newProduct)
            return await newProduct.save();
        } catch (error) {
            return error;
        }
    }
    async deleteProduct(id) {
        try {
            const product = await Product.findByIdAndDelete(id);
            return product;
        } catch (error) {
            return error;
        }
    }
    async updateProduct(id, product) {
        try {
            const product = await Product.findByIdAndUpdate(id, product);
            return product;
        } catch (error) {
            return error;
        }
    }
    
}