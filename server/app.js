// Core Modules
import express from "express"
import { Nuxt, Builder } from "nuxt"

// Parser
import session from "express-session"
import bodyParser from "body-parser"

// Original Routing and Setting
import api from "./api"
import config from "../client/nuxt.config.js"

// Authoriation
import oidc from "./services/oidc-client.js"
import passport from "./services/passport.js"

// Security
import helmet from "helmet"
import csurf from "csurf"

export default issuer => {
    /*
     * Open ID Connect Implement
     */
    const client = new issuer.Client(oidc.client())

    const app = express()

    config.dev = !(process.env.NODE_ENV === "production")
    const nuxt = new Nuxt(config)

    if (config.dev) {
        const builder = new Builder(nuxt)
        builder.build()
    }

    app.use(
        session({
            secret: "keyboard cat",
            resave: false,
            saveUninitialized: false
        })
    )
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.use(passport.initialize())
    app.use(passport.session())

    app.use((req, res, next) => {
        client
            .grant({
                grant_type: "client_credentials"
            })
            .then(done => {
                const Store = require("data-store")
                const store = new Store("oidcAccessToken", {
                    path: "./.config/token.json"
                })
                store.set(done)
                next()
            })
            .catch(err => {
                next(err)
            })
    })

    app.use(helmet())
    app.use(csurf())

    app.get("/auth", (req, res, next) => {
        const axios = require("axios")
        const token = oidc.token()

        axios
            .get("http://localhost:9000/api", {
                headers: {
                    Authorization: token
                }
            })
            .then(response => {
                res.send(response.data)
            })
            .catch(err => {
                res.json(err.response.data)
            })
    })

    app.use("/api", api)

    app.use((err, req, res, next) => {
        if (err.code !== "EBADCSRFTOKEN") return next(err)

        res.status(403).json({
            statusCode: 403,
            path: req.originalUrl,
            message: "Detect attacks",
            contents: null
        })
    })

    app.use((err, req, res, next) => {
        console.error(err.subject.stack)

        res.status(err.code).json({
            statusCode: err.code,
            path: req.originalUrl,
            message: err.subject.message,
            contents: null
        })
    })

    app.use(nuxt.render)

    return app
}
