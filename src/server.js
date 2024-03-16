import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
// const port = process.env.PORT || 5000
import connectDb from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import patientRoutes from './routes/patientsRoutes.js'
import medicationRoutes from './routes/medicationsRoutes.js'
import DocHistoryRoute from './routes/dochistoryRoutes.js'
import roleRoute from './routes/roleRoutes.js'
import triageRoute from './routes/triageRoutes.js'
import testRoute from './routes/testRoutes.js'
import stationRoute from './routes/stationRoutes.js'
import { errorHandler, notFound } from './middlewere/errorMiddleware.js'
import cookieParser from 'cookie-parser'
import Lab from '../iolab.js'
import HTTP from 'http'


connectDb()
const app = express()
var http = HTTP.createServer(app);
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api/users', userRoutes)
app.use('/api/doc/history', DocHistoryRoute)
app.use('/api/patients', patientRoutes)
app.use('/api/medications', medicationRoutes)
app.use('/api/triage', triageRoute)
app.use('/api/roles', roleRoute)
app.use('/api/tests', testRoute)
app.use('/api/stations', stationRoute)
app.get('/', (req, res) => res.send("Server started"))
app.use(notFound);
app.use(errorHandler);

// app.listen(port, () => console.log(`Server started on port ${port}`))
const port =
    process.env.NODE_ENV === "production" ? process.env.PORT || 5000 : 5000;
http.listen(port, () => console.log("Server listening on port " + port));

let io = Lab(http);
global.io = io;