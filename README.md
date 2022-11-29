# assign-mentor

         
#### API requests and responses
1.  <mark>Register Student</mark>
    `POST` - http://localhost:4000/registerStudent
  Request 
   ```
{
    "student_name" : "Rakesh Mayura",
    "student_id" : "22CS01"
}
```
Response
```
{
    "acknowledged": true,
    "insertedId": "6385f9c11034d9a1d177d837"
}
```
2. <mark>Register Mentor</mark>
    `POST` - http://localhost:4000/registerMentor
  Request 
 ```
{
    "student_name" : "Rakesh Mayura",
    "student_id" : "22CS01"
}

```
Response
```
{
    "acknowledged": true,
    "insertedId": "6385fbec1034d9a1d177d838"
}
```
3. <mark>Assign Student to Mentor</mark>
   `PUT` - http://localhost:4000/assignAStudent
  Request 
 ```
{
    "mentor_id": "22MT02",
    "student_id": ["22CS04", "22CS05"]
}
```
Response
```
{
    "acknowledged": true,
    "modifiedCount": 0,
    "upsertedId": "6385fe2fefc6c6cb0bc678d9",
    "upsertedCount": 1,
    "matchedCount": 0
}
```
4.<mark>Update Mentor of a Student</mark>
 `PUT` - http://localhost:4000/updateStudent
  Request 
 ```
{
    "student_id":"22CS05",
    "mentor_id":"22MT01"
}
```
Response
```
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
```

5.<mark>Student without Mentor</mark>
 `GET` - http://localhost:4000/studentWithoutMentor
Response
```
[
    {
        "student_name": "Rakesh Mayura",
        "student_id": "22CS01"
    },
    {
        "student_name": "Diya Mishra",
        "student_id": "22CS02"
    },
    {
        "student_name": "Nithya Kora",
        "student_id": "22CS03"
    },
    {
        "student_name": "Lakshmi Narayanan",
        "student_id": "22CS04"
    }
]
```

6.<mark>Mentor without Student</mark>
 `GET` - http://localhost:4000/mentorWithoutStudent
Response
```
{
    "msg": "All Mentors have been assigned to students."
}
```

7.<mark>List of Mentors assigned to Students</mark>
 1.`GET` - http://localhost:4000/getStudentList
Request
```
{
    "mentor_id": "22MT02"
}
```

Response
```
{
    "mentor_id": "22MT02",
    "student_list": [
        "22CS04",
        "22CS05"
    ]
}

```
