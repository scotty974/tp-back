import mongoose from "mongoose";
const ObjectId = mongoose.Schema.ObjectId

const schema = new mongoose.Schema({
  id: ObjectId,
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

export default schema;