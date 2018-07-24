import api from "./api"
import config from "../client/nuxt.config.js"
import express from "express"
import { Nuxt, Builder } from "nuxt"
import session from "express-session"

export default issuer => {
    /*
     * Open ID Connect Implement
     */
    
    const client = new issuer.Client({
        client_id: "hogeee",
        client_secret: "fuga"
    })

    const app = express()

    config.dev = !(process.env.NODE_ENV === "production")
    const nuxt = new Nuxt(config)

    if (config.dev) {
        const builder = new Builder(nuxt)
        builder.build()
    }

    console.log(app)
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
            console.log(done)
            next()
        })
        .catch(err => {
            console.error(err)
            res.send('UnAuthorized')
        })
    })
    
    app.use("/api", api)
    app.use(nuxt.render)

    return app
}