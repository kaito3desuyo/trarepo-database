import { Router } from "express"
const router = Router()

import users from "./users"
import auth from "./auth"
import agencies from "./agencies"

router.use("/users", users)
router.use("/auth", auth)
router.use("/agencies", agencies)

export default router
