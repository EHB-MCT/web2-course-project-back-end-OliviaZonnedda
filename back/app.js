const express = require('express')
const app = express()
const port = 3000

const uri = "mongodb+srv://olivia:ipjXcBgjQrV0XfSh@cluster1.rle79lp.mongodb.net/?appName=Cluster1";
const { MongoClient } = require("mongodb");


const client = new MongoClient(uri);
const dbName = "cityBite"


async function startServer() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(dbName);
        const col = db.collection("foodSpot");

        app.get("/", (req, res) => {
            res.send("jail!");
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
