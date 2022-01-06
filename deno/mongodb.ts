import { MongoClient } from "https://deno.land/x/mongo@v0.29.0/mod.ts";

const client = new MongoClient();

await client.connect("mongodb+srv://petrovicmarija:rasa0037@cluster0.qhsxn.mongodb.net/Melus?authMechanism=SCRAM-SHA-1");

const db = client.database('Melus');

export default db;