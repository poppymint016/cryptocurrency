const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth');
const { register, login, getUserAll } = require('../controllers/user')

//http://localhost:3000/api/register
//ลงทะเบียนเข้าสู่ระบบ
// {
//     "username": " ",
//     "email": " ",
//     "password": " "
//   }
router.post('/register', register)

//http://localhost:3000/api/login
//เข้าสู่ระบบ
// {
//     "email": "test02@test.com",
//     "password": "12345"
//   }
router.post('/login', login)

//http://localhost:3000/api/getUserAll
//สำหรับtest transfer
router.get('/getUserAll', getUserAll)

module.exports = router