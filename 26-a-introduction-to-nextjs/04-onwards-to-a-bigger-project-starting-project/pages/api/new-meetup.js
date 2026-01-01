import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup
export default async function handler(req, res) {

    if (req.method === "POST") {
        const data = req.body;
        // const { title, image, address, description } = data;

        const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_URL);
        const db = client.db();

        const meetupsCollection = db.collection("meetups");
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        await client.close();
        res.status(201).json({ message: "Meetup inserted" });
    }

}
