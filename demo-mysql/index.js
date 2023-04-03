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

app.get('/users',  (req, res, next) =>{
	try {
		connection.query(
			'SELECT * FROM `users`',
			(err, results, fields) => {
			  res.json(results);
			}
		  );
	} catch (error) {
		res.status(400).json({message: "get user was successfully"})
	}
  })

  app.get('/users/:id', function (req, res, next) {
	try {
		const id = req.params.id;
	connection.query(
	  'SELECT * FROM `users` WHERE `id` = ?',
	  [id],
	  function(err, results) {
		res.status(200).json({payload:results});
	  }
	);
	} catch (error) {
		res.status(400).json({message: "get user by id was successfully"})
	}
  })

app.post('/users', (req, res, next) => {
	try {
		connection.query(
			'INSERT INTO `users`(`fname`, `lname`, `username`, `password`, `avatar`) VALUES (?, ?, ?, ?, ?)',
			[req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar],
			(err, results) => {
				res.status(201).json({ message: "create user was successfully", payload: results });
			}
		);
	} catch (error) {
		res.status(400).json({ message: "create user was failed" });
	}
})

app.put('/users/:id', (req, res, next) => {
	try {
		connection.query(
			'UPDATE `users` SET `fname`= ?, `lname`= ?, `username`= ?, `password`= ?, `avatar`= ? WHERE id = ?',
			[req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar, req.params.id],
			(err, results) => {
				res.json({ message: "update user was successfully", payload: results });
			}
		);
	} catch (error) {
		res.status(400).json({ message: "update user was failed" });
	}
})

app.delete('/users/:id', (req, res, next) => {
	try {
		connection.query(
			'DELETE FROM `users` WHERE id = ?',
			[req.params.id],
			function (err, results) {
				res.status(200).json({ message: "delete user was successfully", payload: results });
			}
		);
	} catch (error) {
		res.status(400).json({ message: "delete user was failed" });
	}
})

app.listen(PORT, () => {
	console.log(`Cors enabled server listening on ${PORT}`)
})




