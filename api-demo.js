const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000


app.get('/', (req, res)=>{
	res.send("Hello! Node.js")
})



app.listen(PORT, ()=>{
	console.log(`SERVER ON PORT ${PORT}`)
})