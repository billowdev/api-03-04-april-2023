# การสร้าง API โดยใช้ JavaScript Node.js Express

# คำนำ
เอกสารฉบับนี้เป็นการพัฒนา web service หรือ RESTful API โดยใช้ภาษา JavaScript Node.js ร่วมกับเฟรมเวิร์กและไลบรารี่ต่าง ๆ ได้แก่ Express HTTP Framework Sequelize พร้อมทั้งสร้างฐานข้อมูลเชิงสัมพันธ์ โดยใช้ฐานข้อมูล MySQL และทดสอบ API โดยใช้ POSTMAN

# สารบัญ

## [1. Basic API](#1-basic-api-1)
- [PART 1-1 - Intro ](#part-1-1---Intro)
- [PART 1-2 - สร้าง Route ด้วย express](#part-1-2---สร้าง-route-ด้วย-express)
- [PART 1-3 - ตัวอย่างการสร้าง API](#part-1-3---ตัวอย่างการสร้าง-api)
- [PART 1-4 - การสร้าง script](#part-1-4---การสร้าง-scripts)
- [PART 1-5 - RESTful API](#part-1-5---restful-api)
- [PART 1-6 - Method GET and Api params](#part-1-6---method-get-and-api-params)
- [PART 1-7 - Using JSON](#part-1-7---using-json-and-method-post)
- [PART 1-8 - Mehod PUT](#part-1-8---method-put)
- [PART 1-9 - Mehod DELETE](#part-1-9---method-delete)

## [2. Basic API MySql](#2-basic-api-mysql-1)

- [PART 2-1 - Create new app Express and MySQL](#part-2-1---create-new-app-express-and-mysql)
- [PART 2-2 - Connect MySQL Database](#part-2-2---connect-mysql-database)
- [PART 2-3 - CREATE USER](#part-2-3---create-user)
- [PART 2-4 - UPDATE USER](#part-2-4---update-user)
- [PART 2-5 - DELETE USER](#part-2-5---delete-user)

## [3. Sequelize](#3-sequelize)

- [PART 3-1 - การติดตั้ง Sequelize](#part-3-1---การติดตั้ง-sequelize)
- [PART 3-2 - New project for Sequelize demo](#part-3-2---new-project-for-sequelize-demo)
- [PART 3-3 - Config Sequelize](#part-3-3---config-sequelize)
- [PART 3-4 - สร้างโมเดล Student และ faculty](#part-3-4---สร้างโมเดล-student-และ-faculty)
- [PART 3-5 - การสร้าง controllers](#part-3-5---การสร้าง-controllers)
- [PART 3-6 - การสร้าง faculty routes](#part-3-6---การสร้าง-faculty-routes)
- [PART 3-7 - การสร้าง student routes](#part-3-7---การสร้าง-student-routes)
- [PART 3-8 - การสร้าง routes เพิ่มเติม](#part-3-8---การสร้าง-routes-เพิ่มเติม)



# 1. Basic API

## PART 1-1 - Intro 
### > [กลับไปที่สารบัญ](#สารบัญ)
### `server.js` โค้ดเริ่มต้นสำหรับ สร้าง server โดดยใช้ http library
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

### install nodemon
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

### ทำการสร้างไฟล์ `app.js`

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
### รันแอปเพื่อทดสอบ
```bash
nodemon app.js
```

## PART 1-3 - ตัวอย่างการสร้าง API
### > [กลับไปที่สารบัญ](#สารบัญ)
### สร้างไฟล์ชื่อ `app-demo.js`

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

### รันแอปเพื่อทดสอบ
```bash
nodemon app-demo.js
```


## PART 1-4 - การสร้าง Scripts
### > [กลับไปที่สารบัญ](#สารบัญ)
### สร้าง script เพื่อรันแอป โดยสามารถแก้ไขได้ที่ package.json ในส่วน scripts เช่น `"dev": "nodemon ./server.js"` ตัวอย่างดังภาพ

<img src="https://raw.githubusercontent.com/billowdev/api-03-04-april-2023/main/readme/img/img_1.png" alt="example package json">

### package.json
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
### สร้าง `db.json` เป็นการจำลอง json เพื่อใช้ในการทดสอบ 
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

### require db.json
```js
const users = require('./db.json')
```

- create route for get users
```js
app.get('/users', (req, res)=>{
	res.json(users)
})

```

### ตัวอย่าง app-demo.js
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
### สร้าง api route มี endpoint คือ /users/:id เพื่อดึงข้อมูล users จาก `users`

```js
app.get('/users/:id', (req, res)=>{
	res.json(users.find(el => el.id === Number(req.params.id)))
})
```
### ตัวอย่างโค้ดใน `api-demo.js` PART 1-6 - API Params
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

### ติดตั้ง body-parser
```bash
npm install body-parser --save
```
- เพิ่มโค้ดเพื่อใช้งาน json
- body parser
- import body-parser
```js
const bodyParser = require('body-parser')
```
### โค้ดเรียกใช้งาน body-parser
```js
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
```

### หรือใช้ express
```js
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
```

### สร้าง user โดยใช้ Method POST
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

### ตัวอย่างโค้ดใน `api-demo.js`PART 1-7 - Using JSON and Method POST
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
### ตัวอย่างโค้ดใน `api-demo.js` สำหรับ PART 1-8 - METHOD PUT
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

### ตัวอย่างโค้ด  METHOD DELETE  /users:id
```js
app.delete('/users/:id', (req, res) => {
const user = users.findIndex(user => user.id === Number(req.params.id))
res.json(`Delete user '${users[user].username}' was successfully.`)
})
```

### ตัวอย่างโค้ดใน `api-demo.js` PART 1-9 - METHOD DELETE
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

### create folder `demo-mysql`
```bash
mkdir demo-mysql
```
### access to folder `demo-mysql`
```bash
cd mkdir demo-mysql
```
### create node app
```bash
npm init -y
```

### create index.js
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
### install essential package

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
### connect db
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

### ทดสอบดึงข้อมูลจากฐานข้อมูล
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
### insert user
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

### ตัวอย่างการอัปเดตข้อมูล
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

### ตัวอย่างการลบข้อมูล
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
### การติดตั้ง driver สำหรับฐานข้อมูล 
- โดยต้องติดตั้งตามฐานข้อมูลที่ใช้ เช่น mysql จะต้องติดตั้ง mysql2 เป็นต้น

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
### ติดตั้ง package
```bash
npm install express mysql2 cors sequelize
npm install -D nodemon
```
### ตัวอย่างโค้ด server.js สำหรับ PART 3-2 - New project for Sequelize demo
```js
const express = require('express')
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 5000

app.get('/', (req, res)=>{
	res.json({message: "Welcome to my app"})
})

app.listen(PORT, ()=>{
	console.log(`SERVER ON PORT ${PORT}`)
})
```

## PART 3-3 - Config Sequelize
### > [กลับไปที่สารบัญ](#สารบัญ)

### create folder `config`
- new file `db.config.js`

```js
module.exports = {
	DB_HOST: "localhost",
	DB_USERNAME: "root",
	DB_PASSWORD: "",
	DB_DATABASE: "db_std",
	dialect: "mysql",
	pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
	}
  };
```

### ใช้ config ในไฟล์ index.js ในโฟลเดอร์ models

- models/index.js
```js
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB_DATABASE, dbConfig.DB_USERNAME, dbConfig.DB_PASSWORD, {
  host: dbConfig.DB_HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// for register the model that you create example student model
// db.students = require("./student.model.js")(sequelize, Sequelize);

module.exports = db;
```

### for sync database in `server.js`

```js
const express = require('express')
const app = express();
const db = require("./models");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
	res.json({ message: "Welcome to my app" })
})

db.sequelize.sync({ force: false })
	.then(() => {
		console.log("Database was synchronized successfully.");
		app.listen(PORT, () => {
			console.log(`SERVER ON PORT ${PORT}`)
		})
	})
	.catch((err) => {
		console.log("Failed to synchronize database: " + err.message);
	});
```

## PART 3-4 - สร้างโมเดล Student และ faculty
### > [กลับไปที่สารบัญ](#สารบัญ)

### models/student.model.js
```js
module.exports = (sequelize, Sequelize) => {
	const Student = sequelize.define("student", {
	  stdId: {
		primaryKey: true,
		type: Sequelize.STRING,
		field: "std_id",
	  },
	  stdPass: {
		type: Sequelize.STRING,
		field: "std_pass",
	  },
	  stdName: {
		type: Sequelize.STRING,
		field: "std_name",
	  },
	  facId: {
		type: Sequelize.INTEGER,
		field: "fac_id",
		unique: false
	  },
	}, {
		sequelize,
		tableName: 'student',
		freezeTableName: true,
		timestamps: false
	});
  
	return Student;
  };
```
### models/faculty.model.js
```js
module.exports = (sequelize, Sequelize) => {
	const Faculty = sequelize.define("faculty", {
	  facultyId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: "fac_id"
	  },
	  facultyName: {
		type: Sequelize.STRING,
		field: "fac_name",
	  },
	},{
		sequelize,
		tableName: 'faculty',
		freezeTableName: true,
		timestamps: false
	});
  
	return Faculty;
  };
```

### register model in `models/index.js`
	- add this code for students

		`db.students = require("./student.model.js")(sequelize, Sequelize);`

	- add this code for faculty
		`db.faculty = require("./faculty.model.js")(sequelize, Sequelize);`

### ตัวอย่างโค้ด index.js	
```js
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB_DATABASE, dbConfig.DB_USERNAME, dbConfig.DB_PASSWORD, {
  host: dbConfig.DB_HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// for register the model that you create example student model
db.students = require("./student.model.js")(sequelize, Sequelize);
db.faculty = require("./faculty.model.js")(sequelize, Sequelize);

module.exports = db;
```

## PART 3-5 - การสร้าง controllers
### > [กลับไปที่สารบัญ](#สารบัญ)

### สร้าง ไฟล์ `faculty.controller.js` ใน `controllers`
- `faculty.controller.js`
```js
const db = require('../models')
const faculty = db.faculty;

// get all faculty
const db = require('../models')
const facultyModel = db.facultyModel;
const Op = db.Sequelize.Op;

exports.findAll = async (req, res) =>{
	try {
		const response = await facultyModel.findAll()
		res.status(200).json({
			message: "get all faculty was successfully",
			payload: response
		})	
	} catch (error) {
		res.status(500).json({
			message:  error.message || "get all faculty was failed"
		})		
	}	
}
```

- `student.controller.js`
```js
const db = require('../models')
const studentModel = db.studentModel;
// get all student
exports.findAll = async (req, res) =>{
	try {
		const response = await studentModel.findAll()
		res.status(200).json({
			message: "get all student was successfully",
			payload: response
		})	
	} catch (error) {
		res.status(500).json({
			message:  error.message || "get all student was failed"
		})		
	}	
}
```

## PART 3-6 - การสร้าง faculty routes
### > [กลับไปที่สารบัญ](#สารบัญ)

- `faculty.route.js`
```js
const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/faculty.controller");

router.get("/", facultyController.findAll);

module.exports = router;
```

### เพิ่มโค้ดใน `server.js`
```js
const facultyRoute = require("./routes/faculty.route");
app.use("/api/faculty", facultyRoute);
```

### ตัวอย่างโค้ดใน server.js สำหรับ PART 3-6 - การสร้าง faculty routes
```js
const express = require('express')
const app = express();
const db = require("./models");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
	res.json({ message: "Welcome to my app" })
})

const facultyRoute = require("./routes/faculty.route");
app.use("/api/faculty", facultyRoute);

db.sequelize.sync({ force: false })
	.then(() => {
		console.log("Database was synchronized successfully.");
		app.listen(PORT, () => {
			console.log(`SERVER ON PORT ${PORT}`)
		})
	})
	.catch((err) => {
		console.log("Failed to synchronize database: " + err.message);
	});
```


## PART 3-7 - การสร้าง student routes
### > [กลับไปที่สารบัญ](#สารบัญ)

### `student.route.js`
```js
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

router.get("/", studentController.findAll);
  
module.exports = router;
```


### เพิ่มโค้ดใน `server.js`
```js
const studentRoute = require("./routes/student.route");
app.use("/api/student", studentRoute);
```

### ตัวอย่างโค้ดทั้งหมดในไฟล์ server.js สำหรับ PART 3-6 - หลังจากการสร้าง faculty routes
```js
const express = require('express')
const app = express();
const db = require("./models");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
	res.json({ message: "Welcome to my app" })
})

const facultyRoute = require("./routes/faculty.route");
app.use("/api/faculty", facultyRoute);

const studentRoute = require("./routes/student.route");
app.use("/api/student", studentRoute);

db.sequelize.sync({ force: false })
	.then(() => {
		console.log("Database was synchronized successfully.");
		app.listen(PORT, () => {
			console.log(`SERVER ON PORT ${PORT}`)
		})
	})
	.catch((err) => {
		console.log("Failed to synchronize database: " + err.message);
	});
```

## PART 3-8 - การสร้าง routes เพิ่มเติม ใน faculty
### > [กลับไปที่สารบัญ](#สารบัญ)

### สร้าง createOne ใน `faculty.controller.js`
```js
exports.createOne = async (req, res) => {
	try {
		const response = await facultyModel.create(req.body)
		res.status(201).json({
			message: "create one faculty was successfully",
			payload: response
		})
	} catch (error) {
		res.status(500).json({
			message: error.message || "create one faculty was failed"
		})
	}
}
```

#### ตัวอย่างโค้ดทั้งหมดในไฟล์ `faculty.controller.js` หลังจากการสร้าง createOne ใน `faculty.controller.js`
```js
const db = require('../models')
const facultyModel = db.facultyModel;
const Op = db.Sequelize.Op;

// get all facultyModel
exports.findAll = async (req, res) => {
	try {
		const response = await facultyModel.findAll()
		console.log(facultyModel)
		res.status(200).json({
			message: "get all faculty was successfully",
			payload: response
		})
	} catch (error) {
		res.status(500).json({
			message: error.message || "get all faculty was failed"
		})
	}
}

exports.createOne = async (req, res) => {
	try {
		const response = await facultyModel.create(req.body)
		res.status(201).json({
			message: "create one faculty was successfully",
			payload: response
		})
	} catch (error) {
		res.status(500).json({
			message: error.message || "create one faculty was failed"
		})
	}
}
```

#### สร้าง route สำหรับ createOne ใน `faculty.route.js`
```js
router.post("/", facultyController.createOne);
```

#### ตัวอย่างโค้ดทั้งหมดในไฟล์ `faculty.route.js` สำหรับการสร้าง route สำหรับ createOne ใน `faculty.route.js`

```js
const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/faculty.controller");

router.get("/", facultyController.findAll);
router.post("/", facultyController.createOne);

module.exports = router;
```


### สร้าง update ใน `faculty.controller.js`
```js
exports.update = async (req, res) => {
	try {
		const id = req.params.id

		const body = req.body
		const response = await facultyModel.update(body, {
			where: { fac_id: id },
		})
		if (response[0] == 1) {
			res.status(200).json({
				message: "update one faculty was successfully",
				payload: response
			})
		} else {
			res.status(400).json({
				message: `update one faculty was failed faculty with fac_id=${id}. Maybe fac was not found or req.body is empty!`
			});
		}
	} catch (error) {
		res.status(500).json({
			message: error.message || "update one faculty was failed"
		})
	}
}
```
#### ตัวอย่างโค้ดทั้งหมดในไฟล์ `faculty.controller.js` หลังจากการสร้าง update ใน `faculty.controller.js`
```js
const db = require('../models')
const facultyModel = db.facultyModel;
const Op = db.Sequelize.Op;

// get all facultyModel
exports.findAll = async (req, res) => {
	try {
		const response = await facultyModel.findAll()
		console.log(facultyModel)
		res.status(200).json({
			message: "get all faculty was successfully",
			payload: response
		})
	} catch (error) {
		res.status(500).json({
			message: error.message || "get all faculty was failed"
		})
	}
}

exports.createOne = async (req, res) => {
	try {
		const response = await facultyModel.create(req.body)
		res.status(201).json({
			message: "create one faculty was successfully",
			payload: response
		})
	} catch (error) {
		res.status(500).json({
			message: error.message || "create one faculty was failed"
		})
	}
}

exports.update = async (req, res) => {
	try {
		const id = req.params.id

		const body = req.body
		const response = await facultyModel.update(body, {
			where: { fac_id: id },
		})
		if (response[0] == 1) {
			res.status(200).json({
				message: "update one faculty was successfully",
				payload: response
			})
		} else {
			res.status(400).json({
				message: `update one faculty was failed faculty with fac_id=${id}. Maybe fac was not found or req.body is empty!`
			});
		}
	} catch (error) {
		res.status(500).json({
			message: error.message || "update one faculty was failed"
		})
	}
}
```

#### สร้าง route สำหรับ update ในไฟล์ `faculty.route.js`
```js
router.put("/:id", facultyController.update);
```

#### ตัวอย่างโค้ดทั้งหมดในไฟล์ `faculty.route.js` หลังจากการสร้าง route สำหรับ update
```js
const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/faculty.controller");

router.get("/", facultyController.findAll);
router.post("/", facultyController.createOne);
router.put("/:id", facultyController.update);
  
module.exports = router;
```


### สร้าง delete ใน `faculty.controller.js`
```js
exports.delete = async (req, res) => {
	try {
		const id = req.params.id;
		const response = await facultyModel.destroy({
			where: { fac_id: id }
		})
		if (response == 1) {
			res.status(200).json({
				message: "delete faculty was successfully",
				payload: response
			})
		} else {
			res.status(400).json({
				message: `delete faculty was failed faculty with fac_id=${id}. Maybe faculty was not found!`
			});
		}
	} catch (error) {
		res.status(500).json({
			message: error.message || "delete faculty was failed"
		})
	}
}
```

#### ตัวอย่างโค้ดทั้งหมดในไฟล์ `faculty.controller.js` หลังจากการสร้าง delete ใน `faculty.controller.js`
```js
const db = require('../models')
const facultyModel = db.facultyModel;
const Op = db.Sequelize.Op;

// get all facultyModel
exports.findAll = async (req, res) => {
	try {
		const response = await facultyModel.findAll()
		console.log(facultyModel)
		res.status(200).json({
			message: "get all faculty was successfully",
			payload: response
		})
	} catch (error) {
		res.status(500).json({
			message: error.message || "get all faculty was failed"
		})
	}
}

exports.createOne = async (req, res) => {
	try {
		const response = await facultyModel.create(req.body)
		res.status(201).json({
			message: "create one faculty was successfully",
			payload: response
		})
	} catch (error) {
		res.status(500).json({
			message: error.message || "create one faculty was failed"
		})
	}
}

exports.update = async (req, res) => {
	try {
		const id = req.params.id

		const body = req.body
		const response = await facultyModel.update(body, {
			where: { fac_id: id },
		})
		if (response[0] == 1) {
			res.status(200).json({
				message: "update faculty was successfully",
				payload: response
			})
		} else {
			res.status(400).json({
				message: `update faculty was failed faculty with fac_id=${id}. Maybe fac was not found or req.body is empty!`
			});
		}
	} catch (error) {
		res.status(500).json({
			message: error.message || "update faculty was failed"
		})
	}
}

exports.delete = async (req, res) => {
	try {
		const id = req.params.id;
		const response = await facultyModel.destroy({
			where: { fac_id: id }
		})
		if (response == 1) {
			res.status(200).json({
				message: "delete faculty was successfully",
				payload: response
			})
		} else {
			res.status(400).json({
				message: `delete faculty was failed faculty with fac_id=${id}. Maybe faculty was not found!`
			});
		}
	} catch (error) {
		res.status(500).json({
			message: error.message || "delete faculty was failed"
		})
	}
}
```

#### สร้าง route สำหรับ delete ใน `faculty.route.js`
```js
router.delete("/:id", facultyController.delete);
```

#### ตัวอย่างโค้ดทั้งหมดในไฟล์ `faculty.route.js` หลังจากการสร้าง route สำหรับ delete ใน `faculty.route.js`

```js
const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/faculty.controller");

router.get("/", facultyController.findAll);
router.post("/", facultyController.createOne);
router.put("/:id", facultyController.update);
router.delete("/:id", facultyController.delete);
  
module.exports = router;
```


## PART 3-9 - การสร้าง controller & route สำหรับ student
### > [กลับไปที่สารบัญ](#สารบัญ)