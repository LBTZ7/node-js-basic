import  express  from "express";
import homeController from '../controller/homeController'

let router = express.Router()

/** 
 * use "get" to get all data you need
 * use "post" to create new data and send to SQL
*/

const initWebRoute = (app) =>{
    router.get('/', homeController.getHomePage)
    router.get('/detail/user/:id', homeController.getDetailPage)
    router.post('/create-new-user', homeController.createNewUser)
    router.get('/about', (req, res) => {
        res.send(`I'm Thomas!`)
    })

    return app.use('/', router);
 
}

module.exports = initWebRoute;