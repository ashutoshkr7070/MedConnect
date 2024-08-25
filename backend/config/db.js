const mongoose = require('mongoose')

const connectDb = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`Databse Connected`)

  } catch (error) {
    console.log(`MongoDB Server Issue ${error}`)
  }
} 

module.exports = connectDb;