import { Router } from "express";
import { getAll } from "../controllers/currency.controller";

const router: Router = Router();

router.get("/", getAll);

export default router;
