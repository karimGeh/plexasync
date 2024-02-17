import { Router } from "express";
import {
  getMeHandler,
  signInHandler,
  signInValidator,
  verifyTokenHandler,
} from "../../handlers/auth";
import { validateRequest } from "../../middlewares/validate-request";
import { requireAuth } from "../../middlewares/require-auth";

const router = Router();

// ! GET
router.get("/get-me", requireAuth, getMeHandler);

// ! POST
router.post("/verify-token", verifyTokenHandler);
router.post("/sign-in", signInValidator, validateRequest, signInHandler);

export { router as authRouter };
