import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoute from './route/web';
// import connection from './configs/connectDB'

require('dotenv').config()

const app = express()
const port = process.env.PORT

// call this to use method 'POST' and 'GET'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up view engine
configViewEngine(app)

// init web route
initWebRoute(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})