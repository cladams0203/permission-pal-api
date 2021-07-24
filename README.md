# permission-pal-api

Api for permission pal

## Base Url:

---

## Endpoint Summary

---

|  Type  |       Endpoint       |       Description       | Protection Type |
| :----: | :------------------: | :---------------------: | :-------------: |
|  POST  |  /api/auth/register  |   Register a new User   |      none       |
|  POST  |   /api/auth/login    |  Login a current User   |      none       |
|  GET   |      /api/users      |      Get all Users      |   Super Admin   |
|  GET   |    /api/users/:id    |  Get a User by User Id  |   Base Token    |
|  PUT   |    /api/users/:id    | Update an existing User |   Base Token    |
|  GET   |     /api/schools     |     Get all schools     |   Base Token    |
|  GET   | /api/schools?name='' | Search schools by name  |   Base Token    |
|  GET   |   /api/schools/:id   |    Get school by id     |   Base Token    |
|  PUT   |   /api/schools/:id   |     Update a school     |  School Admin   |
| DELETE |   /api/schools/:id   |     Remove a school     |  School Admin   |
