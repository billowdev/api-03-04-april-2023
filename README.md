# api-03-04-april-2023
อบรม API

## part 1 - intro 

#### `server.js` โค้ดเริ่มต้นสำหรับ สร้าง server โดดยใช้ http library
```js
const http = require('http')
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res)=>{
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World \n')
})

server.listen(port, hostname, ()=>{
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
- หรือสร้าง script เพื่อรันแอป โดยสามารถแก้ไขได้ที่ package.json ในส่วน scripts เช่น `"dev": "nodemon ./server.js"` ตัวอย่างดังภาพ

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


## part 2 - สร้าง route ด้วย express
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


