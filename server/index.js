/**
 * Module dependencies.
 */

import appFactory from './app'

/**
 * Open ID Connect OP.
 */
const { Issuer } = require('openid-client')
Issuer.discover('http://localhost:9000/op').then(issuer => {

/*
 * Default bin/www
 */

    /**
     * Module dependencies.
     */

    const app = appFactory(issuer)
    const debug = require("debug")("trarepo-database:server")
    const http = require("http")

    /**
     * Get port from environment and store in Express.
     */

    const port = normalizePort(process.env.PORT || "3000")
    app.set("port", port)

    /**
     * Create HTTP server.
     */

    const serverWorker = http.createServer(app)

    /**
     * Listen on provided port, on all network interfaces.
     */

    serverWorker.listen(port)
    serverWorker.on("error", onError)
    serverWorker.on("listening", onListening)

    /**
     * Normalize a port into a number, string, or false.
     */

    function normalizePort(val) {
        var port = parseInt(val, 10)

          if (isNaN(port)) {
            // named pipe
            return val
        }

        if (port >= 0) {
            // port number
            return port
        }

        return false
    }

    /**
    * Event listener for HTTP server "error" event.
    */

    function onError(error) {
        if (error.syscall !== "listen") {
            throw error
        }

        var bind = typeof port === "string" ? "Pipe " + port : "Port " + port

        // handle specific listen errors with friendly messages
        switch (error.code) {
        case "EACCES":
                console.error(bind + " requires elevated privileges")
                process.exit(1)
            break
            case "EADDRINUSE":
                console.error(bind + " is already in use")
            process.exit(1)
            break
            default:
            throw error
        }
    }

    /**
    * Event listener for HTTP server "listening" event.
    */

    function onListening() {
        var addr = serverWorker.address()
        var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
        debug('Listening on ' + bind)
    }

}).catch(err => {
    console.error(err)
    process.exit(1)
})