const express = require('express')
const router = express.Router()
const { createCrypto, getCrypto, updateCrypto, deleteCrypto} = require('../controllers/manageCrypto')

//http://localhost:3000/api/createCrypto
//สร้างคริปโต
// {
//     "cryptoName": "BNB",
//     "currentPrice": 33
//   }
router.post('/createCrypto', createCrypto)

//http://localhost:3000/api/getCrypto
//ดูคริปโตทั้งหมด
router.get('/getCrypto', getCrypto)

//http://localhost:3000/api/updateCrypto
//อัปเดตคริปโต
// {
//     "cryptoId": "65a239f39b2d2b2fbbbb9188",
//     "newcryptoName": "P2P",
//     "newPrice": 22
//   }
router.put('/updateCrypto', updateCrypto)

//http://localhost:3000/api/deleteCrypto/:cryptoId
//ลบคริปโต
router.delete('/deleteCrypto/:cryptoId', deleteCrypto);

module.exports = router