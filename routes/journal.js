import express from "express";
import * as journal from "../controllers/journal.js";
import jwtToken from "../middleware/Jwt.js";
import SharedJwtToken from "../middleware/shareJwt.js"
import * as rateLimit from "../middleware/rateLimiter.js";
const router = express.Router();

// Protected route

// Post routes
router.post("/create",rateLimit.idLimit,jwtToken, journal.createjournal);
router.post("/delete",rateLimit.idLimit,jwtToken,journal.deletejournal);
// get routes
router.get("/history",rateLimit.idLimit,jwtToken, journal.alljournal);

export default router;