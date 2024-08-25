const express = require('express');
const morgan = require('morgan');
const connectDb = require('./config/db');
const cors = require('cors');
require('dotenv').config();

// mongodb connection
connectDb();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'))
app.use(cors())


// routes
app.use('/api/v1/user', require('./routes/userRoutes'));

const port = process.env.PORT || 8080;
// listen
app.listen(port, () => {
  console.log(`Server running on PORT : ${port}`)
})