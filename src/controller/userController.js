import { UserService } from "../service/userService.js";
const userService = new UserService();
import argon from "argon2";
import jwt from "jsonwebtoken";
import userSchema from "../schema/zod/userValidator.js";
class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async register(req, res) {
    let data;
    try {
      data = userSchema.parse(req.body);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    const user = await this.userService.getUserByEmail(data.email);
    if (user) {
      return res.status(400).json({ error: "L'utilisateur existe déjà !" });
    }
    const passwordHash = await argon.hash(data.password);

    await this.userService.register({
      username: data.name,
      email: data.email,
      password: passwordHash,
      role: data.role || "user",
    });
    return res.status(201).json({ message: "L'utilisateur a bien été crée !" });
  }

  async login(req, res) {
    let data;
    try {
      data = userSchema.parse(req.body);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    const user = await this.userService.loginUser(data.email);
    if (!user) {
      return res.status(400).json({ error: "L'utilisateur n'existe pas !" });
    }
    const passwordMatch = await argon.verify(user.password, data.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ error: "Le mot de passe ou email est incorrect !" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res.status(200).json({ token: token });
  }

  async deleteUser(req, res) {
    const userId = req.params.id;
    const authId = req.auth.id;
    if (!authId){
      return res.status(400).json({ error: "Connectez vous !" });
    }
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "L'utilisateur n'existe pas !" });
    }
    await this.userService.deleteProfile(userId);
    return res
      .status(200)
      .json({ message: "L'utilisateur a bien été supprimé !" });
  }

  async updateUser(req, res) {
    const userId = req.params.id;
    let data;
    try {
      data = userSchema.parse(req.body);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "L'utilisateur n'existe pas !" });
    }
    console.log(data)
    await this.userService.updateUser(userId, data);
    return res
      .status(200)
      .json({ message: "L'utilisateur a bien été mis à jour !" });
  }

  async getAllUsers(req, res) {
    const userId = req.auth.id;
    console.log(userId);
    if (userId) {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    }
    return res.status(400).json({ error: "Connectez vous !" });
  }
}

export default new UserController(userService);
