# permission-pal-api

Api for permission pal

## Base Url:

---

## Endpoint Summary

---

|  Type  |         Endpoint         |                Description                 | Protection Type |
| :----: | :----------------------: | :----------------------------------------: | :-------------: |
|  POST  |    /api/auth/register    |            Register a new User             |      none       |
|  POST  |     /api/auth/login      |            Login a current User            |      none       |
|  GET   |        /api/users        |               Get all Users                |   Super Admin   |
|  GET   |      /api/users/:id      |           Get a User by User id            |   Base Token    |
|  PUT   |      /api/users/:id      |          Update an existing User           |   Base Token    |
|  GET   |       /api/schools       |              Get all schools               |   Base Token    |
|  GET   |   /api/schools?name=''   |           Search schools by name           |   Base Token    |
|  GET   |     /api/schools/:id     |              Get school by id              |   Base Token    |
|  PUT   |     /api/schools/:id     |              Update a school               |  School Admin   |
| DELETE |     /api/schools/:id     |              Remove a school               |  School Admin   |
|  GET   |       /api/classes       |              Get all Classes               |   Super Admin   |
|  GET   |     /api/classes/:id     |              Get Class by id               |   Base Token    |
|  GET   | /api/classes/school/:id  |        Get all Classes by School id        |   Base Token    |
|  GET   | /api/classes/teacher/:id |       Get all Classes by Teacher id        |   Base Token    |
|  GET   | /api/classes/student/:id |       Get all Classes by Student id        |   Base Token    |
|  PUT   |     /api/classes/:id     |               Update a Class               |     Teacher     |
| DELETE |     /api/classes/:id     |               Remove a Class               |     Teacher     |
|  GET   |        /api/forms        |               Get all forms                |   Super Admin   |
|  GET   |      /api/forms/:id      |               Get form by id               |   Basic Token   |
|  GET   |  /api/forms/master/:id   | Get all forms created off of a master form |     Teacher     |
|  GET   |  /api/forms/school/:id   |         Get all forms for a school         |  School Admin   |
|  GET   |   /api/forms/class/:id   |         Get all forms for a class          |     Teacher     |
|  GET   |  /api/forms/parent/:id   |     Get all student forms by parent id     |     Parent      |
|  GET   |  /api/forms/student/:id  |    Get all student forms by student id     |   Base Token    |
|  PUT   |      /api/forms/:id      |       Update an existing form record       |     Parent      |
| DELETE |      /api/forms/:id      |            Remove a form record            |  School Admin   |
