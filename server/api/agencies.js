import { Router } from "express"
import axios from "../services/axios"
import https from "https"
import xml from "xml2js"
require("dotenv").config()

const router = Router()

/* GET users listing. */
router.get("/", (req, res, next) => {
    axios
        .get("/agencies", {})
        .then(result => {
            res.json(result.data.contents)
        })
        .catch(err => {
            console.log(err)
            next({
                code: 400,
                subject: err.response.data
            })
        })
})

router.post("/", (req, res, next) => {
    const agency_data = {
        agencyNumber: req.body.data.agencyNumber,
        parentAgencyNumber: req.body.data.parentAgencyNumber,
        agencyOfficialName: req.body.data.agencyOfficialName,
        agencyName: req.body.data.agencyName,
        agencyType: req.body.data.agencyType,
        agencyUrl: req.body.data.agencyUrl,
        agencyPhone: req.body.data.agencyPhone,
        agencyFareUrl: req.body.data.agencyFareUrl
    }
    axios
        .post("/agencies", agency_data)
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

router.delete("/", (req, res, next) => {
    axios
        .delete("/agencies", {
            params: {
                id: req.query.id
            }
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

router.get("/searchCorpNumAPI/:fetchby/:value/", (req, res, next) => {
    const agent = new https.Agent({
        rejectUnauthorized: false
    })
    let URL = `https://api.houjin-bangou.nta.go.jp/3/${req.params.fetchby}?id=${
        process.env.CORPORATION_NUMBER_API_ID
    }`
    if (req.params.fetchby === "name") {
        URL += `&name=${encodeURIComponent(req.params.value)}`
    } else if (req.params.fetchby === "num") {
        URL += `&number=${req.params.value}`
    } else {
        next({
            code: 400,
            subject: { stack: null, message: "Parameter error" }
        })
    }
    URL += "&type=12&history=0"
    axios
        .get(URL, { httpsAgent: agent })
        .then(response => {
            xml.parseString(response.data, (err, result) => {
                if (err) {
                    next({
                        code: 400,
                        subject: { stack: null, message: err }
                    })
                }
                res.json(result)
            })
        })
        .catch(err => {
            console.log(err.response.data)
            next({
                code: 400,
                subject: { stack: null, message: err.response.data }
            })
        })
})
export default router
