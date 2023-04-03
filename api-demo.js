const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000

const users = require('./db.json')

app.get('/', (req, res)=>{
	res.send("Hello! Node.js")
})

app.get('/users', (req, res)=>{
	res.status(200).json(users)
})


app.listen(PORT, ()=>{
	console.log(`SERVER ON PORT ${PORT}`)
})