import express from "express";
import * as auth from "../controllers/auth.js";
import jwtToken from "../middleware/Jwt.js";
import * as rateLimit from "../middleware/rateLimiter.js";

const router = express.Router();

// Post routes
router.post("/register",rateLimit.ipLimit, auth.register);
router.post("/login",rateLimit.ipLimit, auth.login);

// Protected route
// get routes
router.get("/profile",rateLimit.idLimit,jwtToken,auth.profile);


export default router;