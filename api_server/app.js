import express, { json } from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerConfigs from './configs/swaggerConfig.js'
import apiRoutes from './routes/index.js'
import { postgresDB } from './configs/postgresDB.js'
import validateApiKey from './middlewares/validateApiKey.js'
import errorHandling from './middlewares/errorHandling.js'

const app = express()
app.use(cors())
app.use(json())
app.use(errorHandling)

const port = process.env.API_SERVER_PORT || 4000

const router = express.Router()
apiRoutes(router)
app.use("/api", validateApiKey, router)

// API docs
const swaggerUiOptions = {
    customSiteTitle: "DDocs API Documentation",
    customCss: '.swagger-ui .topbar { display: none }'
};
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfigs, swaggerUiOptions));

// connect to the database and start the web server
postgresDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`The API server is listening on port ${port}`)

        })
    }).catch((err) => {
        console.error('Unable to connect to the database:', err);
    });