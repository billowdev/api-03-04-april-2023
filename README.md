# การอบรม API โดยใช้ JavaScript Node.js Express <br />(api-03-04-april-2023)

## สารบัญ
- [PART 1 - Intro ](#part-1---Intro)
- [PART 2 - สร้าง route ด้วย express](#part-2---สร้าง-route-ด้วย-express)
- [PART 3 - ตัวอย่างการสร้าง api](#part-3---ตัวอย่างการสร้าง-api)
- [PART 4 - การสร้าง script](#part-4---การสร้าง-scripts)
- [PART 5 - RESTful API](#part-5---restful-api)
- [PART 6 - Api params](#part-6---api-params)
- [PART 7 - Using JSON](#part-7---using-json-and-method-post)
- [PART 8 - Mehod PUT](#part-8---method-put)

## PART 1 - Intro 
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


## PART 2 - สร้าง route ด้วย express
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

## PART 3 - ตัวอย่างการสร้าง API
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


## PART 4 - การสร้าง Scripts
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


## PART 5 - RESTful API
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

# PART 6 - api params
### > [กลับไปที่สารบัญ](#สารบัญ)
- สร้าง api route มี endpoint คือ /users/:id เพื่อดึงข้อมูล users จาก `users`

```js
app.get('/users/:id', (req, res)=>{
	res.json(users.find(el => el.id === Number(req.params.id)))
})
```
- ตัวอย่างโค้ด app-demo.js
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

## PART 7 - Using JSON and Method POST
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

- ตัวอย่าง โค้ด app-demo.js
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

## PART 8 - METHOD PUT
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
- ตัวอย่างโค้ดใน `api-demo.js` สำหรับ PART 8 - METHOD PUT
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


## PART 9 - METHOD DELETE
- ตัวอย่างโค้ด  METHOD DELETE  /users:id
```js
app.delete('/users/:id', (req, res) => {
const user = users.findIndex(user => user.id === Number(req.params.id))
res.json(`Delete user '${users[user].username}' was successfully.`)
})
```

- ตัวอย่างโค้ดใน `api-demo.js` PART 9 - METHOD DELETE
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