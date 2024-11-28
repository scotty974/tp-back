import { expressjwt } from "express-jwt";
import dotenv from "dotenv";
dotenv.config();
const auth = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});

export default auth;