const express = require('express')

const app = express()

app.use(express.json())

let a,b,c;
a = 1;
b = 2;
c = a+b;
console.log(`result a+b=${c}`)

console.log(`Hello, World!`)
// users = [{
// 	id: 1,
// 	role: 'user',
// 	username: 'user01',
// }]
// app.get("/", (req, res)=>{
// 	return res.status(200).json({
// 		message: "hello world",
// 		payload: {
// 			id: 1,
// 			role: 'user',
// 			username: 'user01',
// 		}
// 	})
// })

// app.post("/users", (req, res)=>{
// 	users.push({...req.body})
// 	return res.status(201).json({
// 		message: "create user was successfully",
// 		payload: users
// 	})
// })

// app.get("/users", (req, res)=>{
// 	users.push({...req.body})
// 	return res.status(200).json({
// 		message: "get user was successfully",
// 		payload: users
// 	})
// })


// app.listen(5000, () => {
// 	console.log('Server listening on port 5000!');
//   });

