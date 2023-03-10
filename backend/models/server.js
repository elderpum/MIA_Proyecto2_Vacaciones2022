const express = require('express');
const cors = require('cors');
const fileupload = require('express-fileupload');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT ?? 5000;
        this.paths = {
            login: '/api/login',
            users: '/api/users',
            vuelos: '/api/vuelos',
            autos: '/api/autos',
            healthcheck: '/healthcheck'
        }

        // Middlewares
        this.middlewares();

        // Routes of the app
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        // Body parsing
        this.app.use(express.json());

        this.app.use(fileupload());
        this.app.use(express.urlencoded({ extended: true }));

    }

    routes() {
        this.app.get(this.paths.healthcheck, (req, res) => res.status(200).json({ok: "ok"}));
        this.app.use(this.paths.login, require('../routes/login'))
        this.app.use(this.paths.users, require('../routes/users'))
        this.app.use(this.paths.vuelos, require('../routes/vuelos'))
        this.app.use(this.paths.autos, require('../routes/autos'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server on port', this.port);
        })
    }
}

module.exports = Server;