import { Router } from "express"
import passport from "passport"
const router = Router()

/* GET users listing. */
router.get("/", (req, res) => {
    res.send("respond wiiiiith a resource")
})

// Twitter Auth
router.get("/twitter", passport.authenticate("twitter"))

// Google Auth
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile"]
    })
)

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
    res.redirect("/api/auth/cookie")
})

//testing
router.get("/cookie", (req, res) => {
    res.json(req.user)
})

export default router
