import { Router } from "express"
import passport from "passport"
import axios from "axios"
import nanoid from "../services/nanoid"
import nodemailer from "../services/nodemailer"

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

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/users/authfailure"
    }),
    (req, res) => {
        res.redirect("/")
    }
)

//testing
router.get("/cookie", (req, res) => {
    res.json(req.user)
})
router.get("/session", (req, res) => {
    res.json(req.session)
})

//local login
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/"
    })
)

//local signup

//Email Exist Check
router.post("/local/emailcheck", (req, res, next) => {
    const isExistEmail = address =>
        new Promise((resolve, reject) => {
            axios
                .get(`http://localhost:9000/api/v1/users/`, {
                    params: {
                        searchColumn: "email",
                        searchValue: address
                    }
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
        })

    const generateCode = () =>
        new Promise((resolve, reject) => {
            const code = nanoid.identifyCode()
            req.session.identifyCode = code
            req.session.email = req.body.email
            resolve(code)
        })

    const sendEmail = code =>
        new Promise((resolve, reject) => {
            nodemailer.send(
                "a",
                req.body.email,
                "[TraRepo]メールアドレス確認コード",
                code,
                (err, msg) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(msg)
                    }
                }
            )
        })

    const exec = async () => {
        const dbCheck = await isExistEmail()
        const genCode = await generateCode()
        const sendMail = await sendEmail(genCode)
        return sendMail
    }
    exec()
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            next({
                code: 400,
                subject: err
            })
        })
})

router.post("/local/codecheck", (req, res, next) => {
    const code = req.body.identifyCode
    const cookie = req.session.identifyCode
    if (code && code === cookie) {
        res.json(req.session.email)
    } else {
        next({
            code: 400,
            subject: {
                stack: null,
                message: "確認コードが異なります"
            }
        })
    }
})

router.post("/local/createuser", (req, res, next) => {
    axios
        .post("http://localhost:9000/api/v1/users/", {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            provider: "local"
        })
        .then(result => {
            if (result.data.contents[1] === false) {
                next({
                    code: 400,
                    subject: {
                        stack: null,
                        message: "既に登録されているメールアドレスです"
                    }
                })
                return
            }
            res.json("done")
        })
        .catch(err => {
            next({
                code: 400,
                subject: err.response.data
            })
        })
})

router.get("/logoff", (req, res) => {
    req.logout()
    res.redirect("/")
})

export default router
