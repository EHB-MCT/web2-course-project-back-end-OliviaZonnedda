const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')

app.use(cors())

const { MongoClient } = require("mongodb");

const { DATABASE_URI } = require('./config');

const client = new MongoClient(DATABASE_URI);
const dbName = "cityBite"


async function startServer() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(dbName);
        const col = db.collection("foodSpot");

        app.get("/", (req, res) => {
            res.send("examen");
        });


        app.get("/data", async (req, res) => {
            try {
                const data = await col.find({}).toArray();
                console.log(data);
                res.json(data);
            } catch (error) {
                console.error(error);
                res.status(500).send("Can't read cityBite from database");
            }
        });

        app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}

startServer();
