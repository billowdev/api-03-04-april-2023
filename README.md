# สร้าง API โดยใช้ JavaScript Node.js Express

# สารบัญ

### [1. Basic API](#1-basic-api-1)
- [PART 1-1 - Intro ](#part-1-1---Intro)
- [PART 1-2 - สร้าง Route ด้วย express](#part-1-2---สร้าง-route-ด้วย-express)
- [PART 1-3 - ตัวอย่างการสร้าง API](#part-1-3---ตัวอย่างการสร้าง-api)
- [PART 1-4 - การสร้าง script](#part-1-4---การสร้าง-scripts)
- [PART 1-5 - RESTful API](#part-1-5---restful-api)
- [PART 1-6 - Method GET and Api params](#part-1-6---method-get-and-api-params)
- [PART 1-7 - Using JSON](#part-1-7---using-json-and-method-post)
- [PART 1-8 - Mehod PUT](#part-1-8---method-put)
- [PART 1-9 - Mehod DELETE](#part-1-9---method-delete)

### [2. Basic API MySql](#2-basic-api-mysql-1)

- [PART 2-1 - Create new app Express and MySQL](#part-2-1---create-new-app-express-and-mysql)

- [PART 2-2 - Connect MySQL Database
](#part-2-2---connect-mysql-database)

- [PART 2-3 - CREATE USER](#part-2-3---create-user)
- [PART 2-4 - UPDATE USER](#part-2-4---update-user)
- [PART 2-5 - DELETE USER](#part-2-5---delete-user)

## [3. Sequelize](#3-sequelize)

- [PART 3-1 - การติดตั้ง Sequelize](#part-3-1---การติดตั้ง-sequelize)
- [PART 3-2 - New project for Sequelize demo](#part-3-2---new-project-for-sequelize-demo)



# 1. Basic API

## PART 1-1 - Intro 
### > [กลับไปที่สารบัญ](#สารบัญ)
#### `server.js` โค้ดเริ่มต้นสำหรับ สร้าง server โดดยใช้ http library
```js
const http = require('http')
const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const server = http.createServer((req, res)=>{
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World \n')
})

server.listen(PORT, HOSTNAME, ()=>{
	console.log(`Server running at http://${hostname}:${port}`)
})
```

## install nodemon
- ติดตั้งสำหรับ dev dependencies ของแอปพลิเคชัน
```bash
npm install -D nodemon
```
หรือ 
```bash
npm install --save-dev nodemon
```
- ติดตั้งสำหรับ global
```bash
npm install -g nodemon
```

- ใช้คำสั่งเพื่อรันแอป โดยใช้โหนดมอน
```bash
nodemon index.js
```
- แทนที่ index.js ด้วย ชื่อแอปของคุณ


## PART 1-2 - สร้าง route ด้วย express
### > [กลับไปที่สารบัญ](#สารบัญ)
- ติดตั้ง express http framework
```bash
npm install express --save
```

- ทำการสร้างไฟล์ `app.js`

- เพิ่มโค้ดสำหรับ import ตัว express js บน server.js
```js
const express = require('express');
const app = express();
app.use(express.json())
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
```
- รันแอปเพื่อทดสอบ
```bash
nodemon app.js
```

## PART 1-3 - ตัวอย่างการสร้าง API
### > [กลับไปที่สารบัญ](#สารบัญ)
- สร้างไฟล์ชื่อ `app-demo.js`

```js
const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000


app.get('/', (req, res)=>{
	res.send("Hello! Node.js")
})

app.listen(PORT, ()=>{
	console.log(`SERVER ON PORT ${PORT}`)
})
```

- รันแอปเพื่อทดสอบ
```bash
nodemon app-demo.js
```


## PART 1-4 - การสร้าง Scripts
### > [กลับไปที่สารบัญ](#สารบัญ)
- สร้าง script เพื่อรันแอป โดยสามารถแก้ไขได้ที่ package.json ในส่วน scripts เช่น `"dev": "nodemon ./server.js"` ตัวอย่างดังภาพ

<img src="https://raw.githubusercontent.com/billowdev/api-03-04-april-2023/main/readme/img/img_1.png" alt="example package json">

- package.json
```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "example javascript or node.js application that use express http framework",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon ./server.js"
  },
  "keywords": [],
  "author": "billowdev",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.2.0",
    "sequelize": "^6.30.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```


## PART 1-5 - RESTful API
### > [กลับไปที่สารบัญ](#สารบัญ)
- สร้าง `db.json` เป็นการจำลอง json เพื่อใช้ในการทดสอบ 
```json
[
	{
	  "id": 1,
	  "username": "user1",
	  "name": "Alice"
	},
	{
	  "id": 2,
	  "username": "user2",
	  "name": "Lac"
	},
	{
	  "id": 3,
	  "username": "user3",
	  "name": "Billo"
	}
]
```

- require db.json
```js
const users = require('./db.json')
```

- create route for get users
```js
app.get('/users', (req, res)=>{
	res.json(users)
})

```

- ตัวอย่าง app-demo.js
```js
const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000

const users = require('./db.json')

app.get('/', (req, res)=>{
	res.send("Hello! Node.js")
})

app.get('/users', (req, res)=>{
	res.json(users)
})


app.listen(PORT, ()=>{
	console.log(`SERVER ON PORT ${PORT}`)
})
```

## PART 1-6 - Method GET and Api params
### > [กลับไปที่สารบัญ](#สารบัญ)
- สร้าง api route มี endpoint คือ /users/:id เพื่อดึงข้อมูล users จาก `users`

```js
app.get('/users/:id', (req, res)=>{
	res.json(users.find(el => el.id === Number(req.params.id)))
})
```
- ตัวอย่างโค้ดใน `api-demo.js` PART 1-6 - API Params
```js
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

app.get('/users/:id', (req, res)=>{
	res.json(users.find(el => el.id === Number(req.params.id)))
})

app.listen(PORT, ()=>{
	console.log(`SERVER ON PORT ${PORT}`)
})
```

## PART 1-7 - Using JSON and Method POST
### > [กลับไปที่สารบัญ](#สารบัญ)

- ติดตั้ง body-parser
```bash
npm install body-parser --save
```
- เพิ่มโค้ดเพื่อใช้งาน json
- body parser
- import body-parser
```js
const bodyParser = require('body-parser')
```
- โค้ดเรียกใช้งาน body-parser
```js
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
```

- หรือใช้ express
```js
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
```

- สร้าง user โดยใช้ Method POST
```js
app.post('/users', (req, res) => {
	// push ข้อมูลจาก body ไปใน users array
	users.push(req.body)
	// ดึงเฉพาะข้อมูล username เก็บไว้ใน ตัวแปร useranme
	let username = req.body.username
	// ส่ง response กลับไปให้ผู้ใช้งาน api
	res.json(`Add user: '${username}' was successfully.`)
  })
```

- ตัวอย่างโค้ดใน `api-demo.js`PART 1-7 - Using JSON and Method POST
```js
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

app.listen(PORT, ()=>{
	console.log(`SERVER ON PORT ${PORT}`)
})
```

## PART 1-8 - METHOD PUT
### > [กลับไปที่สารบัญ](#สารบัญ)
- โค้ดตัวอย่าง METHOD PUT /users:id
```js
  app.put('/users/:id', (req, res) => {
	// ค้นหา user ด้วย id ที่รับมาจาก params
	const user = users.findIndex(user => user.id === Number(req.params.id))
	// demo การส่ง response กลับไป ว่าอัปเดตข้อมูลสำเร็จ
	res.json(`Update user id: '${users[user].id}' was successfully.`)
  })
```
- ตัวอย่างโค้ดใน `api-demo.js` สำหรับ PART 1-8 - METHOD PUT
```js
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

app.listen(PORT, ()=>{
	console.log(`SERVER ON PORT ${PORT}`)
})
```


## PART 1-9 - METHOD DELETE
### > [กลับไปที่สารบัญ](#สารบัญ)

- ตัวอย่างโค้ด  METHOD DELETE  /users:id
```js
app.delete('/users/:id', (req, res) => {
const user = users.findIndex(user => user.id === Number(req.params.id))
res.json(`Delete user '${users[user].username}' was successfully.`)
})
```

- ตัวอย่างโค้ดใน `api-demo.js` PART 1-9 - METHOD DELETE
```js
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
```

# 2. Basic API MySql
### > [กลับไปที่สารบัญ](#สารบัญ)

## PART 2-1 - Create new app Express and MySQL

- create folder `demo-mysql`
```bash
mkdir demo-mysql
```
- access to folder `demo-mysql`
```bash
cd mkdir demo-mysql
```
- create node app
```bash
npm init -y
```

- create index.js
```js
const express = require('express')
const cors = require('express')
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.listen(PORT, ()=>{
	console.log(`Cors enabled server listening on ${PORT}`)
})

```
- install essential package

```bash
npm install express mysql2 cors --save
```

- install nodemon
```bash
npm install -D nodemon
```
- install nodemon in global
```bash
npm install -g nodemon
```


## PART 2-2 - Connect MySQL Database
### > [กลับไปที่สารบัญ](#สารบัญ)
- connect db
```js
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'basic_api_express_db'
  });
```
- หรือ หากมีการใช้ .env
```js
const connection = mysql.createConnection({
	host: process.env.DB_HOSTNAME,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
  });
```

- ทดสอบดึงข้อมูลจากฐานข้อมูล
```js
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
```


## PART 2-3 - CREATE USER
### > [กลับไปที่สารบัญ](#สารบัญ)
- insert user
```js
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
```

## PART 2-4 - UPDATE USER
### > [กลับไปที่สารบัญ](#สารบัญ)

- ตัวอย่างการอัปเดตข้อมูล
```js
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
```

## PART 2-5 - DELETE USER
### > [กลับไปที่สารบัญ](#สารบัญ)

- ตัวอย่างการลบข้อมูล
```js
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
```

# Sequelize

## PART 3-1 - การติดตั้ง Sequelize
### > [กลับไปที่สารบัญ](#สารบัญ)

- การติดตั้ง sequelize
- ดูข้อมูลเพิ่มเติมได้ที่ https://sequelize.org/docs/v6/getting-started
```js
npm install --save sequelize
```
- การติดตั้ง driver สำหรับฐานข้อมูล โดยต้องติดตั้งตามฐานข้อมูลที่ใช้ เช่น mysql จะต้องติดตั้ง mysql2 เป็นต้น

- Postgres
```js
npm install --save pg pg-hstore
```
- mysql2
```js
npm install --save mysql2
```
- mariadb
```js
npm install --save mariadb
```
- sqlite3
```js
npm install --save sqlite3
```
- Microsoft SQL Server
```js
npm install --save tedious
```
- Oracle Database
```js
npm install --save oracledb 
```
## PART 3-2 - New project for Sequelize demo
### > [กลับไปที่สารบัญ](#สารบัญ)

```bash
npm init -y
```
- ติดตั้ง package
```bash
npm install express mysql2 cors sequelize
```