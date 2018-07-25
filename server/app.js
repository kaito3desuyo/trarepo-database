import express from "express"
import { Nuxt, Builder } from "nuxt"
import session from "express-session"
import api from "./api"
import config from "../client/nuxt.config.js"
import oidc from "./services/oidc-client.js"

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
                next(err.response.data)
            })
    })

    app.use((err, req, res, next) => {
        console.log(err)
        res.status(err.statusCode).json(err)
    })

    app.use("/api", api)
    app.use(nuxt.render)

    return app
}
