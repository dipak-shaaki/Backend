import express from 'express'
import { sequelize } from './config/database.js'
import authRouter from './route/auth/index.js'
import vendorRouter from './route/vendor/index.js'
import cartRouter from './route/cart/index.js'
import errorMiddleware from './middlewares/error.middleware.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { isCustomer, isProtectedRoute, isVendor } from './middlewares/auth.js'
import { getProductsControllerForUser, getSingleProductForCustomer } from './controller/products/index.js'
import { User } from './model/user.js'
import { Product } from './model/products.js'
import { Cart } from './model/cart.js'

const app = express()
// app.use(cors())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

sequelize.authenticate() //to connect to the database 
  .then(async () => {
    console.log('DB CONNECTED')

    // Set up model associations
    Product.hasMany(Cart, { foreignKey: 'item_id' })
    Cart.belongsTo(Product, { foreignKey: 'item_id' })

    User.hasMany(Product, { foreignKey: 'vendorid' })
    Product.belongsTo(User, { foreignKey: 'vendorid' })

    User.hasMany(Cart, { foreignKey: 'user_id' })
    Cart.belongsTo(User, { foreignKey: 'user_id' })

    // Sync all models
    await sequelize.sync({ alter: false })
    console.log('Database models synced')
  })
  .catch(err => console.error('DB ERROR:', err))

app.get('/', (req, res) => {
  res.send('Hello this is from my backend')
  //console.log('req.url:',req.url,'req.method:',req.method)
})
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/file', require('./route/file/index.js'))

app.use('/auth', authRouter)
app.get('/products', getProductsControllerForUser)
app.get('/products/:id', getSingleProductForCustomer)

app.use(isProtectedRoute) //aaba muni ko route ma apply hunxa 

app.use('/vendor', isVendor, vendorRouter)
app.use('/cart', isCustomer, cartRouter)
app.use(errorMiddleware)
app.listen(8000, () => {
  console.log('Server is running at port 8000')
})

