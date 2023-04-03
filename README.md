# api-03-04-april-2023
อบรม API


server.js
part 1 

```js
// const app = express()
// app.use(express.json())
const http = require('http')
const express = require('express')
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