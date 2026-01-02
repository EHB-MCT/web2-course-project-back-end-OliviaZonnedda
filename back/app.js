const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')

app.use(cors())
app.use(express.json())

const { MongoClient, ObjectId } = require("mongodb");

const { DATABASE_URI } = require('./config');

const client = new MongoClient(DATABASE_URI);
const dbName = "cityBite"


async function startServer() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(dbName);
        const foodSpot = db.collection("foodSpot");
        const userList = db.collection("userList");

        app.get("/", (req, res) => {
            res.send("examen");
        });

        app.post("/login", (req, res) => {
            const { username, password } = req.body;

            if (username == "olivia" && password == "zonnedda") {
                res.status(200).send("Login succesful!");
            } else {
                res.status(401).send("Error reading username/password");
            }
        });

        app.get("/data", async (req, res) => {
            try {
                const data = await foodSpot.find({}).toArray();
                console.log(data);
                res.json(data);
            } catch (error) {
                console.error(error);
                res.status(500).send("Can't read cityBite from database");
            }
        });

        app.get("/data/one/:id", async (req, res) => {
            try {
                const id = new ObjectId(req.params.id);
                const data = await foodSpot.findOne({ '_id': id });
                console.log(data);
                res.json(data);
            } catch (error) {
                console.error(error);
                res.status(500).send("Can't read cityBite from database");
            }
        })

        app.get("/userList/one/:id", async (req, res) => {
            try {
                const id = new ObjectId(req.params.id);
                const data = await userList.findOne({ '_id': id });
                console.log(data);
                res.json(data);
            } catch (error) {
                console.error(error);
                res.status(500).send("Can't read cityBite from database");
            }
        })

        app.get("/userList/:username", async (req, res) => {
            try {
                const data = await userList.find({ username: req.params.username }).toArray();
                console.log(data);
                res.json(data);
            } catch (error) {
                console.error(error);
                res.status(500).send("Can't read user list from database");
            }
        })

        app.delete("/userList/:id", async (req, res) => {
            try {
                const id = new ObjectId(req.params.id);
                const data = await userList.deleteOne({ '_id': id });
                console.log(data);
                res.json(data);
            } catch (error) {
                console.error(error);
                res.status(500).send("Can't delete user data from database");
            }
        })

        app.post("/userList/:username/:id", async (req, res) => {
            try {
                const id = new ObjectId(req.params.id);
                const data = await foodSpot.findOne({ '_id': id });
                delete data._id;
                data.username = req.params.username;

                var result = await userList.insertOne(data);
                console.log(result);
                res.json(result);

            } catch (error) {
                console.error(error);
                res.status(500).send("Can't insert user  data from database");
            }
        })

        app.patch("/userList", async (req, res) => {
            try {
                const data = await userList.updateOne(req.body);
                console.log(data);
                res.json(data);
            } catch (error) {
                console.error(error);
                res.status(500).send("Can't update user data from database");
            }
        })

        app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}

startServer();
