const express = require('express')          // Imports
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const router = require('./routes/index.js')
const errorMiddleware = require('./middlewares/error-middleware')
require('./utils/prototype')

const dotenvExpand = require('dotenv-expand')

const myEnv = dotenv.config()               // Permite sa utilizam .env variabile
dotenvExpand.expand(myEnv)                  // .env in .env variabile -> ${variable}

const PORT = process.env.PORT || 5000       // PORT.
const app = express()                       // Initializarea aplicatiei

//Middlewares
app.use(express.json())                     //
app.use(cookieParser())                     //
app.use(cors({
  credentials: true,
  origin: [process.env.CLIENT_URL, process.env.ADMIN_URL]
}));                            // Permite sa lucrez cu serverul din browser
app.use('/api', router)                     // Conectam routerurile
app.use(errorMiddleware)                    // Middleware pentru monitorizarea erorilor

const start = async () => {                 // Crearea unui Web server pe portul 5000
  try {
    await mongoose.connect(
      process.env.MONGODB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      () => {
        // console.log('Success connection to DB!')
      }
    )
    app.listen(PORT, () => {
      console.log('\x1b[33m%s\x1b[0m', '☀ ',`Server has been started on ${process.env.API_URL}`);
    })
  } catch (e) {
    console.log(e)
  }
}
mongoose.set('strictQuery', true);          //prevent mongoose error

app.get('/', (req, res) => {
  res.json({API: "STARTED", HOST: process.env.API_URL})
})

start().then();