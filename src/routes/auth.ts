import { Router } from "express";

import { logIn, signIn, verify } from "../controllers/auth.controller";
import { checkToken } from "../utils/jwt";

const router: Router = Router();

router.get("/verify", checkToken, verify);

router.post("/sign_in", signIn);

router.post("/log_in", logIn);

export default router;
