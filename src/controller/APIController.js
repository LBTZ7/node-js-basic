import pool from '../configs/connectDB'


let getAllUsers = async (req,res) => {

    const [rows, fields] = await pool.execute('SELECT * FROM users')

    return res.status(200).json({
      message: 'ok',
      data: rows
    })
}

let createNewUser =  async (req,res) => {
    // create new user 
    let {firstName, lastName, email, address} = req.body

    // Validate
    if(!firstName || !lastName || !email || !address){
      return res.status(200).json({
        message: 'Message missing params',
        
      })
    }
    // create new user and send to SQL
    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)', 
    [firstName, lastName, email, address])


    return res.status(200).json({
      message: 'ok',
      
    })
}

let updateUser = async (req,res) => {
    // Edit user informatin and update in SQL
  let {firstName, lastName, email, address, id} = req.body
     // Validate
     if(!firstName || !lastName || !email || !address || !id){
      return res.status(200).json({
        message: 'Message missing params',
        
      })
    }

  await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', 
  [firstName, lastName, email, address, id])

  return res.status(200).json({
    message: 'ok',
    
  })
}

let deleteUser = async (req,res) => {
  // delete existent user and update the SQL
  let userId = req.params.id
   // Validate
   if(!userId){
    return res.status(200).json({
      message: 'Message missing params',
    })
  }
    // delete user in sql
  await pool.execute('delete from users where id = ?', [userId])

  return res.status(200).json({
    message: 'ok'
  })
}
module.exports = {
  getAllUsers, createNewUser, updateUser,
  deleteUser
}
