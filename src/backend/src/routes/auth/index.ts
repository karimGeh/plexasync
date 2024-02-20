import { Router } from "express";
import { AuthHandlers, AuthValidators } from "../../handlers/auth";
import { validateRequest } from "../../middlewares/validate-request";
import { requireAuth } from "../../middlewares/require-auth";

const router = Router();

// ! GET
router.get("/get-me", requireAuth, AuthHandlers.getMeHandler);

// ! POST
router.post("/verify-token", AuthHandlers.verifyTokenHandler);
router.post(
  "/sign-in",
  AuthValidators.signInValidator,
  validateRequest,
  AuthHandlers.signInHandler
);

export { router as authRouter };
