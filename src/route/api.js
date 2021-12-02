import  express  from "express";
import APIcontroller from '../controller/APIController'

let router = express.Router()

/** 
 * use "get" to get all data you need
 * use "post" to create new data and send to SQL
*/

const initAPIRoute = (app) =>{
    router.get('/users', APIcontroller.getAllUsers);  // READ DATA
    router.post('/create-user', APIcontroller.createNewUser);  // CREATE DATA
    router.put('/update-user', APIcontroller.updateUser); // UPDATE DATA
    router.delete('/delete-user/:id', APIcontroller.deleteUser); // UPDATE DATA


    return app.use('/api/v1/', router);
 
}

export default initAPIRoute;