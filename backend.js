const express = require('express');
const http = require('http');
const port = 8080;

const app = express();

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect('mongodb://127.0.0.1:27017/test');
	console.log("Connected to Mongodb");
}

const userSchema = new mongoose.Schema({
	name: String,
	password: String,
	userId: Number
});

const User = mongoose.model('User', userSchema);

let user1 = new User({
	name: "Abigail Andersen",
	password: "password!",
	userId: 0
});

let user2 = new User({
	name: "Bertie Barristan",
	password: "ThisIsAPassword",
	userId: 1
})

User.deleteMany({});

User.insertMany([user1, user2]);

app.get('/', (req, res, next) => {
	let rootMap = `GET /users/:id`;
	res.send(rootMap);
	console.log("GET /");
});

app.get('/users/:id', (req, res, next) => {
	let currUser = User.findOne({userId: req.params.id});
	res.send(currUser);
	console.log("/users/" + req.params.id);
});

app.listen(8080);
console.log(`Server listening on port ${port}`);

