const express = require("express");
const http = require("http");
const port = 8080;

const app = express();

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function main() {
  const uri = "mongodb://127.0.0.1:27017/users";
  console.log("Connecting to " + uri);
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}

main()

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  userId: Number,
});

const User = mongoose.model("User", userSchema);

/*
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
*/

app.get("/users/:userName", (req, res, next) => {
	let currUser = User.find({ name: req.params.userName });
	res.send({ username: currUser["name"], ID: currUser["userId"] });
	console.log("/users/" + req.params.userName);
});


app.get('/', (req, res, next) => {
	let rootMap = `GET /users/:id`;
	res.send(rootMap);
	console.log("GET /");
});

app.listen(8080);
console.log(`Server listening on port ${port}`);
