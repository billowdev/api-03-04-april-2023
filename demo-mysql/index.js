const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'basic_api_express_db'
  });

  app.get('/users', (req, res, next) => {
	connection.query(
	  'SELECT * FROM `users`',
	  function(err, results, fields) {
		res.json(results);
	  }
	);
  })
  
  app.get('/users/:id', (req, res, next) => {
	const id = req.params.id;
	connection.query(
	  'SELECT * FROM `users` WHERE `id` = ?',
	  [id],
	  function(err, results) {
		res.json(results);
	  }
	);
  })


app.post('/users', (req, res, next) => {
connection.query(
	'INSERT INTO `users`(`fname`, `lname`, `username`, `password`, `avatar`) VALUES (?, ?, ?, ?, ?)',
	[req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar],
	function(err, results) {
	res.json(results);
	}
);
})

app.listen(PORT, ()=>{
	console.log(`Cors enabled server listening on ${PORT}`)
})




