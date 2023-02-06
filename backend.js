const express = require('express');
const fs = require('fs');
const cors = require('cors');

const port = 8080;

function readSecret() {
	return fs.readFileSync("secret.txt").toString();
}

const app = express();

app.use(cors());

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect('mongodb://127.0.0.1:27017/test');
	console.log("Connected to Mongodb");
}

const userSchema = new mongoose.Schema({
	username: String,
	password: String
});

const User = mongoose.model('User', userSchema);

// Database sample set
let user1 = new User({
	username: "abby",
	password: "password",
});

let user2 = new User({
	username: "bart",
	password: "ThisIsAPassword",
})

let user3 = new User({
	username: "carlotta",
	password: `${readSecret()}`
})

let users = [user1, user2, user3]

// Prepare database
User.deleteMany({}).then(() => {
	User.insertMany(users)
})

User.find({}, (err, allUsers) => {
	
	if (err) return err;

	allUsers = JSON.parse(JSON.stringify(allUsers));
	for (let i = 0; i < allUsers.length; ++i) {
		// console.log(allUsers[i]["password"])
	}
})	

app.get('/', (req, res, next) => {
	let rootMap = `GET /login/:id`;
	res.send(rootMap);
	console.log("GET /");
});

app.get('/login/:username&:password', cors(), async (req, res, next) => {
	let result = "";

	let query = unnecessaryParsing(req)
	console.log(query)

	User.findOne(query, (err, found) => {
		if (err) return err;
		if (found) {
			result = `<h1>Successful login for ${found.username}</h1>`
			console.log(`Succesful login: ${found.username}`)
		} else {
			result = `<h1>Unsuccessful login for ${req.params.username}</h1>`
			console.log(`Failed login: ${req.params.username}, ${req.params.password}`)
		}

		res.send(result);
	})
});

app.listen(8080);
console.log(`Server listening on port ${port}`);

function unnecessaryParsing(req) {
	let parsedUsername = null
	try {
		parsedUsername = JSON.parse(req.params.username)
	} catch(e) {
		parsedUsername = req.params.username
	}
	
	let parsedPassword = null
	try {
		parsedPassword = JSON.parse(req.params.password)
	} catch(e) {
		parsedPassword = req.params.password
	}

	return {
		username: parsedUsername,
		password: parsedPassword
	}
}