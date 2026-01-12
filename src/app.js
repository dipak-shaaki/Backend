import express from 'express';
import sequelize from './config/db.js';
import authRoute from './routes/auth/index.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/errorMiddleware.js';
import { isCustomer, isProtectedRoute, isVendor } from './middlewares/auth.js';
import vendorRoutes from './routes/vendor/index.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


sequelize.authenticate()
  .then(() => {
    console.log(' DB connected');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log(' Sync complete');
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((err) => {
    console.error('DB error:', err.message);
    process.exit(1); // Exit if DB setup fails
  });