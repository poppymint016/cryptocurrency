const express = require('express')
const router = express.Router()
const { createWallet, getUserWallet } = require('../controllers/wallet')
const verifyToken = require('../middleware/auth');

//x-access-token
//http://localhost:3000/api/createWallet
//เพิ่มเงิน wallet สำหรับซื้อ ขาย แลกเปลี่ยนคริปโต
// {
//     "amount": 70
//   }
router.post('/createWallet', verifyToken, createWallet)

//http://localhost:3000/api/getUserWallet
//เช็คยอดเงินคงเหลือใน wallet
router.get('/getUserWallet', verifyToken, getUserWallet)

module.exports = router