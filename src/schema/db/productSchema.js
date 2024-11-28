import mongoose from "mongoose";
const ObjectId = mongoose.Schema.ObjectId;

const schema = new mongoose.Schema({
  id: ObjectId,
  owner: { type: ObjectId, ref: "Users" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
});

export default schema;
