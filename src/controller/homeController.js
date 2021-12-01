import pool from '../configs/connectDB'

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
  return res.redirect('/')
}


module.exports ={
  getHomePage,
  getDetailPage,
  createNewUser
}