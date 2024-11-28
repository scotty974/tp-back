import mongoose from "mongoose";
import userschema from "../schema/db/userSchema.js";

const User = mongoose.model("User", userschema);

export class UserService {
  constructor() {}

  async register(user) {
    try {
      const newUser = new User(user);
      return await newUser.save();
    } catch (error) {
      console.error("Error during user registration:", error);
      return error;
    }
  }

  async loginUser(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      return error;
    }
  }
  async getUserById(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      return error;
    }
  }
async getUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      return error;
    }
}
  async deleteProfile(id) {
    try {
      const user = await User.findByIdAndDelete(id);
      return user;
    } catch (error) {
      return error;
    }
  }

  async updateUser(id, userData) {
    console.log("Updating user with ID:", id);
    console.log("User data:", userData);
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        userData,
        { new: true } // Retourne l'utilisateur mis à jour
      );
  
      if (!updatedUser) {
        console.log("User not found");
        return null; // Si l'utilisateur n'est pas trouvé, retourne null
      }
  
      console.log("Updated user:", updatedUser); // Affiche l'utilisateur mis à jour
      await updatedUser.save(); // Retourne l'utilisateur mis à jour
    } catch (error) {
      console.error("Error updating user:", error); // Affiche l'erreur
      return error;
    }
  }
  
  

  async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      return error;
    }
  }

}
