const express = require('express')
const app = express()
const port = 3000

const uri = "mongodb+srv://olivia:ipjXcBgjQrV0XfSh@cluster1.rle79lp.mongodb.net/?appName=Cluster1";

const { MongoClient } = require("mongodb");




const client = new MongoClient(uri);
const dbName = "Cluster1"
async function run() {
    try {
        // Connect to the Atlas cluster
        await client.connect();
        console.log("connected correctly toserver");
        // Get the database and collection on which to run the operation
        const db = client.db(dbName);
        const col = db.collection("cityBite");

        // Create new documents                                                                                                                                         
        let cityBiteDocuments = {


            restoName: "CLIFF",
            restoHours: "08:00 - 20:00",
            restoAdress: "Rue De La Montagne 8, 1000 Brussels ",
            foodType: "Brunch",
            description: "CLIFF is a well-known brunch café in central Brussels, just steps from the Grand Place. It serves modern brunch dishes, quality specialty coffee, and creative drinks in a cozy, contemporary space that attracts both locals and visitors throughout the week."

        }


        // Insert the documents into the specified collection        
        const p = await col.insertOne(cityBiteDocuments);

        // Find the document

        const document = await col.findOne();

        // Print results
        console.log(document);

    } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}

run().catch(console.dir);

