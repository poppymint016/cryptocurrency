const express = require('express')
const router = express.Router()
const { buyCrypto, sellCrypto, transferCrypto, getUserTransaction } = require('../controllers/transection')
const verifyToken = require('../middleware/auth');

//x-access-token
//http://localhost:3000/api/buyCrypto
//ซื้อคริปโต
// {
//     "cryptoID": "65a239f39b2d2b2fbbbb9188",
//     "amount": 300
//   }
router.post('/buyCrypto', verifyToken, buyCrypto)

//http://localhost:3000/api/sellCrypto
//ขายคริปโต
// {
//     "cryptoID": "65a239f39b2d2b2fbbbb9188",
//     "amount": 300
//   }
router.post('/sellCrypto', verifyToken, sellCrypto)

//http://localhost:3000/api/transferCrypto
//แลกเปลี่ยนคริปโต
// {
//     "receiverId": "65a14cf02e2a9faa255a67f5",
//     "cryptoID": "65a239f39b2d2b2fbbbb9188",
//     "amount": 300
//   }
router.post('/transferCrypto', verifyToken, transferCrypto)

//http://localhost:3000/api/getUserTransaction
//ประวัติการทำรายการทั้งหมด
router.get('/getUserTransaction', verifyToken, getUserTransaction)

module.exports = router