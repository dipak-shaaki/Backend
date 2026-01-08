
const express = require('express');
const sequelize = require('./config/db');
const authRoute = require('./routes/auth')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./middlewares/errorMiddleware'));

sequelize.authenticate()
  .then(() => {
    console.log(' DB connected');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log(' Sync complete');
  })
  .catch((err) => {
    console.error('DB error:', err.message);

  });


app.use('/auth', authRoute);


app.listen(3000, () => {
  console.log('Server started on port 3000');
}
)