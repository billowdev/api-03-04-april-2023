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


