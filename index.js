import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";



const app = express();

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT;

async function createConnection() {
    const client = new MongoClient(MONGO_URL)
    await client.connect();
    console.log("MongoDB is connected!");
    return client;
}
export const client = await createConnection();

app.use(express.json());
app.use(cors());

app.get("/", function (request, response) {
    response.send("<h1>🙋‍♂️, Welcome to Mentor & Student Assigning API</h1> \n.<h4>This App contains the following endpoints :<h4> \n <h4>1) For Registering Student : /registerStudent .</h4>\n<h4>2) For registering Mentor : /registerMentor .</h4>\n <h4>3) For Assigning a Student to Mentor : /assignAStudent .</h4> \n <h4> 4)For updateStudent: /updateStudent </h4>\n <h4>5)For Students without Mentor: /studentWithoutMentor</h4> \n <h4>6)Mentor without Student: /mentorWithStudent</h4> \n <h4>7)List of Mentors assigned to Students : /getStudentList</h4> \n");
});

// Create Mentor
app.post("/registerMentor", express.json(), async function (request, response) {
    const data = request.body;
    const result = await client
        .db("ASM")
        .collection("Mentor")
        .insertOne(data)
    response.send(result);
})

// Create Student
app.post("/registerStudent", express.json(), async function (request, response) {
    const data = request.body;
    const result = await client
        .db("ASM")
        .collection("Student")
        .insertOne(data)
    response.send(result);
})

// Assign Student to Mentor
app.put("/assignAStudent", express.json(), async function (request, response) {
    const { mentor_id, student_id } = request.body;
    const query = { mentor_id: mentor_id };
    const update = { $push: { student_list: { $each: student_id } } };
    const options = { upsert: true };

    const result = await client
        .db("ASM")
        .collection("Mentor")
        .updateOne(query, update, options);

    const updatedresult = await client
        .db("ASM")
        .collection("Student")
        .updateOne(
            { student_id: student_id },
            { $set: { mentor_id: mentor_id } },
            options
        )
    response.send(updatedresult);
})

// Update Student
app.put("/updateStudent", express.json(), async function (request, response) {
    const { mentor_id, student_id } = request.body;
    const result = await client
        .db("ASM")
        .collection("Student")
        .updateOne({ student_id: student_id }, { $set: { mentor_id: mentor_id } })
    const updatedresult = await client
        .db("ASM")
        .collection("Mentor")
        .updateOne(
            { mentor_id: mentor_id },
            { $addToSet: { student_list: { $each: [student_id] } } }
        )
    response.send(result)
})

// List of Students without Mentor Assigned
app.get("/studentWithoutMentor", async function (request, response) {
    const result = await client
        .db("ASM")
        .collection("Student")
        .find({ mentor_id: { $exists: false } }, { projection: { _id: false } })
        .toArray();
    result.length === 0
        ? response.send({ msg: "All Students have been assigned to available Mentors." })
        : response.send(result);
})

// List of  Mentors without Students Assigned 
app.get("/mentorWithoutStudent", async function (request, response) {
    const result = await client
        .db("ASM")
        .collection("Mentor")
        .find(
            { student_list: null },
            {
                projection: {
                    student_list: true,
                    _id: false,
                    mentor_id: true,
                    name: true,
                },
            }
        )
        .toArray();
    result.length === 0
        ? response.send({ msg: "All Mentors have been assigned to students." })
        : response.send(result);

})

// List of Mentors assigned to students
app.get("/getStudentList", async function (request, response) {
    const { mentor_id } = request.body;
    const result = await client
        .db("ASM")
        .collection("Mentor")
        .findOne(
            { mentor_id: mentor_id },
            { projection: { student_list: true, _id: false, mentor_id: true } }
        )
    response.send(result);
});


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
