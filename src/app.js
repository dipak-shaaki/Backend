import express from 'express'
import sequelize from './config/db.js'
import authRouter from './routes/auth/index.js'
import vendorRouter from './routes/vendor/index.js'
import cartRouter from './routes/cart/index.js'
import errorMiddleware from './middlewares/errorMiddleware.js'
import cookieParser from 'cookie-parser'
import { isProtectedRoute, isVendor } from './middlewares/auth.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

sequelize.authenticate() //to connect to the database 
  .then(() => console.log('DB CONNECTED'))
  .catch(err => console.error('DB ERROR:', err))

app.get('/', (req, res) => {
  res.send('Hello this is from my backend')
})

app.use('/auth', authRouter)
app.use('/cart', cartRouter)
app.use(isProtectedRoute) //aaba muni ko route ma apply hunxa

app.use('/vendor', isVendor, vendorRouter)

app.use(errorMiddleware)
app.listen(3000, () => {
  console.log('Server is running at port 3000')
})
