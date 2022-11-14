import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import routers from './routes/router.js'

const corsOptions = {
	exposedHeaders: 'Authorization'
}
const app = express()

const allowedOrigins = ['http://127.0.0.1:3000']

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions))
app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin) return callback(null, true)
			if (allowedOrigins.indexOf(origin) === -1) {
				const msg = 'The CORS policy for this site does not allow access from the specified Origin.'
				return callback(new Error(msg), false)
			}
			return callback(null, true)
		}
	})
)

app.use('/api', routers)

if (process.env.NODE_ENV !== 'test') {
	app.listen(process.env.PORT, () => {
		console.log(`Server is running on port ${process.env.PORT}`)
	})
}

export default app
