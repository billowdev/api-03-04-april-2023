# api-03-04-april-2023
อบรม API

## สารบัญ
- [PART 1 - intro ](#part-1---intro)
- [PART 2 - สร้าง route ด้วย express](#part-2---สร้าง-route-ด้วย-express)
- [PART 3 - ตัวอย่างการสร้าง api](#part-3---ตัวอย่างการสร้าง-api)
- [PART 4 - การสร้าง script](#part-4---การสร้าง-script)
- [PART 5 - RESTful API](#part-5---restful-api)
- [PART 6 - api params](#part-6---api-params)

## PART 1 - intro 
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

## PART 3 - ตัวอย่างการสร้าง api
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


## PART 4 - การสร้าง script
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

- app-demo.js
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
- โค้ด app-demo.js
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