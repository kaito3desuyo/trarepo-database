import { Router } from "express"
import axios from "axios"
import { v4 as uuid } from "uuid"
const router = Router()

/* GET users listing. */
router.get("/", (req, res) => {
    res.send("respond wiiiiith a resource")
})

router.put("/", (req, res, next) => {
    axios
        .put("http://localhost:9000/api/v1/users/", {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then(result => {
            res.json("done")
        })
        .catch(err => {
            next({
                code: 400,
                subject: err.response.data
            })
        })
})

router.get("/clients", (req, res, next) => {
    axios
        .get("http://localhost:9000/api/v1/clients", {
            params: {
                searchColumn: `data.user_id`,
                searchValue: req.query.user_id
            }
        })
        .then(result => {
            res.json(result.data.contents)
        })
        .catch(err => {
            next({
                code: 400,
                subject: err.response.data
            })
        })
})

router.post("/clients", (req, res, next) => {
    const cli_id = uuid()
    const cli_secret = uuid()
    const client_data = {
        user_id: req.body.user_id,
        client_id: cli_id,
        client_secret: cli_secret,
        grant_types: req.body.grant_types,
        redirect_uris: req.body.redirect_uris,
        response_types: []
    }
    axios
        .post("http://localhost:9000/api/v1/clients/", {
            id: cli_id,
            data: client_data
        })
        .then(result => {
            res.json("done")
        })
        .catch(err => {
            next({
                code: 400,
                subject: err.response.data
            })
        })
})

router.delete("/clients", (req, res, next) => {
    axios
        .delete("http://localhost:9000/api/v1/clients/", {
            params: { id: req.query.id }
        })
        .then(result => {
            res.json("done")
        })
        .catch(err => {
            next({
                code: 400,
                subject: err.response.data
            })
        })
})
export default router
