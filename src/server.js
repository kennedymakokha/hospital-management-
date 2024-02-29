import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 5000
import connectDb from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import patientRoutes from './routes/patientsRoutes.js'
import DocHistoryRoute from './routes/dochistoryRoutes.js'
import triageRoute from './routes/triageRoutes.js'
import { errorHandler, notFound } from './middlewere/errorMiddleware.js'
import cookieParser from 'cookie-parser'
connectDb()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api/users', userRoutes)
app.use('/api/doc/history', DocHistoryRoute)
app.use('/api/patients', patientRoutes)
app.use('/api/triage', triageRoute)
app.get('/', (req, res) => res.send("Server started"))
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`))