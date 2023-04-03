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
- หรือสร้าง script เพื่อรันแอป โดยสามารถแก้ไขได้ที่ package.json ในส่วน scripts เช่น `"dev": "nodemon ./server.js"`

