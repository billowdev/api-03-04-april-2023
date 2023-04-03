const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const PORT = process.env.PORT || 5000

const users = require('./db.json')

app.get('/', (req, res)=>{
	res.send("Hello! Node.js")
})

app.get('/users', (req, res)=>{
	res.status(200).json(users)
})

app.get('/users/:id', (req, res)=>{
	res.json(users.find(el => el.id === Number(req.params.id)))
})

// สร้าง users
app.post('/users', (req, res) => {
	// push ข้อมูลจาก body ไปใน users array
	users.push(req.body)
	// ดึงเฉพาะข้อมูล username เก็บไว้ใน ตัวแปร useranme
	let username = req.body.username
	// ส่ง response กลับไปให้ผู้ใช้งาน api
	res.json(`Add user: '${username}' was successfully.`)
  })

  // update user
  app.put('/users/:id', (req, res) => {
	// ค้นหา user ด้วย id ที่รับมาจาก params
	const user = users.findIndex(user => user.id === Number(req.params.id))
	// demo การส่ง response กลับไป ว่าอัปเดตข้อมูลสำเร็จ
	res.json(`Update user id: '${users[user].id}' was successfully.`)
  })

// delete user
app.delete('/users/:id', (req, res) => {
const user = users.findIndex(user => user.id === Number(req.params.id))
res.json(`Delete user '${users[user].username}' was successfully.`)
})

app.listen(PORT, ()=>{
	console.log(`SERVER ON PORT ${PORT}`)
})