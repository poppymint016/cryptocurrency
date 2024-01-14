## Cryptocurrencies Project

### Getting Started 
1. Clone the repository.
2. Install the required dependencies using **npm install**.
3. Install **npm install bcrypt** & Import data seed using **node seed.js**
4. Start the development server using **npm start**

### Database Structure
#### User ผู้ใช้ระบบ
- userID
- username
- email
- password
#### Wallet วอลเล็ตของผู้ใช้
- WalletID
- userID (Foreign Key references User table)
- balance
#### Cryptocurrency คริปโตเคอร์เรนซี
- name (e.g., BTC, ETH, XRP, DOGE)
- currentPrice
#### Transaction รายการซื้อ-ขาย
- userID (Foreign Key references User table)
- receiverID (Foreign Key references User table)
- cryptoID (Foreign Key references Cryptocurrency table)
- transactionType (Buy/Sell/Transfer)
- amount
- timestamp

### API Structure
**เงื่อนไข** ผู้ใช้จะต้องทำการสร้างบัญชีก่อนและทำการเข้าสู่ระบบเพื่อรับค่า token  จากนั้นเติมเงินเข้าสู่ wallet เพื่อทำการซื้อ ขาย และแลกเปลี่ยน 
#### User registration and authentication 
1. User Registration
    - Method Post /api/register
    - ลงทะเบียนเข้าสู่ระบบ
2. User Login
    - Method Post /api/login
    - เข้าสู่ระบบ
#### Wallet
เมื่อต้องการฝากเงินจะต้องกรอก Headers: **x-access-token** และกรอก token จาก register หรือ login ก่อนเทส API
1. Deposit wallet
    - Method Post /api/createWallet
    - เพิ่มเงิน wallet สำหรับซื้อ ขาย แลกเปลี่ยนคริปโต
2. Balance Wallet
    - Method GET /api/getUserWallet
    - เช็คยอดเงินคงเหลือใน wallet
#### Manage Cryptocurrency
สำหรับสร้างคริปโตไว้เพื่อให้ user ซื้อขาย หรือสำหรับการเพิ่มข้อมูลลงในฐานข้อมูล
1. Add Cryptocurrency
    - Method POST /api/createCrypto
    - สร้างข้อมูลคริปโต
2. GET Cryptocurrency
    - Method GET /api/getCrypto
    - ดูข้อมูลคริปโตทั้งหมด
3. UPDATE Cryptocurrency
    - Method PUT /api/updateCrypto
    - อัปเดตข้อมูลคริปโต
3. DELETE Cryptocurrency
    - Method DELETE /api/deleteCrypto/:cryptoId
    - ลบข้อมูลคริปโต
#### Buy/Sell/Transfer Cryptocurrency
การซื้อ ขาย และแลกเปลี่ยนจะต้องกรอก Headers: **x-access-token** และกรอก token จาก register หรือ login ก่อนเทส API
1. Buy Cryptocurrency
    - Method POST /api/buyCrypto
    - ซื้อคริปโต
2. Sell Cryptocurrency
    - Method POST /api/sellCrypto
    - ขายคริปโต
3. Transfer Cryptocurrency
    - Method POST /api/transferCrypto
    - แลกเปลี่ยนคริปโต
4. Transaction Cryptocurrency
    - Method GET /api/getUserTransaction
    - ประวัติการทำรายการทั้งหมด
