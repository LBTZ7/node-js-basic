import pool from '../configs/connectDB'
import multer from 'multer'


let getHomePage = async (req, res) => {
      const [rows, fields] = await pool.execute('SELECT * FROM users');
      // render the client 
      return res.render('./index.ejs', {dataUser: rows} );

}

let getDetailPage = async (req,res) => {
  // get user id
  let UserId = req.params.id
  // get User from SQL
  let [user] = await pool.execute(`select * from users where id = ?`, [UserId])

  // return User's detail in SQL 
  return res.send(JSON.stringify([user]))
}

let createNewUser = async (req, res) => {
    // create new user and send to SQL
  let {firstName, lastName, email, address} = req.body
  await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)', 
  [firstName, lastName, email, address])
  return res.redirect('/') // reload
}

let deleteUser = async (req, res) => {
    // delete existent user and update the SQL
  let userId = req.body.userId
  await pool.execute('delete from users where id = ?', [userId])
  return res.redirect('/') // reload
}

let getEditPage = async (req, res) => {
  let UserId = req.params.id // get user id
  let [user] = await pool.execute('select * from users where id = ?', [UserId]) // get the user from SQL
  return res.render('./update.ejs',  {dataUser: user[0]})
}

let postUpdateUser = async (req,res) => {
  // Edit user informatin and update in SQL
  let {firstName, lastName, email, address, id} = req.body

  await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', 
  [firstName, lastName, email, address, id])

  return res.redirect('/') // reload
}

let getUploadFilePage = async (req,res) => {
  // redirect to UPload File window
    res.render('uploadFile.ejs')
}

let handleUploadFile = async (req,res) => {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);

}

let handleUploadMultipleFiles = async (req,res) => {

        if (req.fileValidationError) {
              return res.send(req.fileValidationError);
          }
          else if (!req.files) {
              return res.send('Please select an image to upload');
          }

        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="/upload">Upload more images</a>';
        res.send(result);

}

module.exports ={
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  postUpdateUser,
  getUploadFilePage ,
  handleUploadFile,
  handleUploadMultipleFiles
}