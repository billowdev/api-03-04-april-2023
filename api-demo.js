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
	users.push(req.body)
	let username = req.body.username
	res.send(`Add user: '${username}' was successfully.`)
  })

app.listen(PORT, ()=>{
	console.log(`SERVER ON PORT ${PORT}`)
})