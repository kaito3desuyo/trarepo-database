module.exports = function (issuer) {
    const client = new issuer.Client({
        client_id: "hoge",
        client_secret: "fuga"
    })

    return client
        .grant({
            grant_type: "client_credentials"
        })
        .then(done => {
            console.log(done)
            resolve(done) 
        })
        .catch(err => {
            console.error(err)
            process.exit(1)
        })
}