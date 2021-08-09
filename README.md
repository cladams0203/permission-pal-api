# permission-pal-api

Api for permission pal

## Base Url:

---

## Endpoint Summary

---

|  Type  |           Endpoint            |                Description                 | Protection Type |
| :----: | :---------------------------: | :----------------------------------------: | :-------------: |
|  POST  |      /api/auth/register       |            Register a new User             |      none       |
|  POST  |        /api/auth/login        |            Login a current User            |      none       |
|  GET   |          /api/users           |               Get all Users                |   Super Admin   |
|  GET   |        /api/users/:id         |           Get a User by User id            |   Base Token    |
|  PUT   |        /api/users/:id         |          Update an existing User           |   Base Token    |
|  GET   |     /api/users/parent/:id     |          Get parent with students          |     Parent      |
|  POST  | /api/users/parent/:id/student |           Add student to parent            |     Teacher     |
|  GET   |         /api/schools          |              Get all schools               |   Base Token    |
|  GET   |     /api/schools?name=''      |           Search schools by name           |   Base Token    |
|  GET   |       /api/schools/:id        |              Get school by id              |   Base Token    |
|  POST  |         /api/schools          |              Add a new school              |   Base Token    |
|  PUT   |       /api/schools/:id        |              Update a school               |  School Admin   |
| DELETE |       /api/schools/:id        |              Remove a school               |  School Admin   |
|  GET   |         /api/classes          |              Get all Classes               |   Super Admin   |
|  GET   |       /api/classes/:id        |              Get Class by id               |   Base Token    |
|  GET   |    /api/classes/school/:id    |        Get all Classes by School id        |   Base Token    |
|  GET   |   /api/classes/teacher/:id    |       Get all Classes by Teacher id        |   Base Token    |
|  GET   |   /api/classes/student/:id    |       Get all Classes by Student id        |   Base Token    |
|  POST  |         /api/classes          |              Add a new class               |  School Admin   |
|  POST  |   /api/classes/:id/students   |           Add students to class            |     Teacher     |
|  PUT   |       /api/classes/:id        |               Update a Class               |     Teacher     |
| DELETE |       /api/classes/:id        |               Remove a Class               |     Teacher     |
|  GET   |          /api/forms           |               Get all forms                |   Super Admin   |
|  GET   |        /api/forms/:id         |               Get form by id               |   Basic Token   |
|  GET   |     /api/forms/master/:id     | Get all forms created off of a master form |     Teacher     |
|  GET   | /api/forms/master/school/:id  |     Get all master forms for a school      |  School Admin   |
|  GET   |     /api/forms/class/:id      |         Get all forms for a class          |     Teacher     |
|  GET   |     /api/forms/parent/:id     |     Get all student forms by parent id     |     Parent      |
|  GET   |    /api/forms/student/:id     |    Get all student forms by student id     |   Base Token    |
|  POST  |          /api/forms           |               Add a new Form               |     Parent      |
|  PUT   |        /api/forms/:id         |       Update an existing form record       |     Parent      |
| DELETE |        /api/forms/:id         |            Remove a form record            |  School Admin   |

## Role Description

---

- super-admin = Corporate admin permissions. (Permission Pal Employee)
- school_admin = Principal user in charge of school Permission Pal access
- teacher = User with Classroom permissions (No School Permissions)
- parent = User with parent permissions (Sign forms etc..)

# Endpoint Details

---

## Auth

#### POST /api/auth/register

Accepts:

```
{
  role: string,           -- example: "teacher"
  username: string,       -- must be unique -- required
  email: string,          -- must be unique -- required
  password: string,       -- required
  first_name: string,
  last_name: string,
  address: string,
}
```

Returns:

```
{
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  address: string,
  email: string,
  role: string,
  updated_at: string,
  created_at: string,
  token: string         -- Auth token to be stored in headers for protected requests.
}
```

#### POST /api/auth/login

Accepts:

```
{
  username: string,     -- required
  password: string      -- required
}
```

Returns:

```
{
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  address: string,
  email: string,
  role: string,
  updated_at: string,
  created_at: string,
  token: string         -- Auth token to be stored in headers for protected requests.
}
```

## Users

#### GET /api/users

Returns:

```
[
  {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    address: string,
    email: string,
    role: string,
    updated_at: string,
    created_at: string
  }
]
```

#### GET /api/users/:id

Returns:
id param represents user id

```
{
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  address: string,
  email: string,
  role: string,
  updated_at: string,
  created_at: string
}
```

#### GET /api/users/parent/:id

id param represents user id (parent)
Returns:

```
{
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  address: string,
  email: string,
  role: string,
  updated_at: string,
  created_at: string,
  students: [
    {
      id: number,
      school_id: number,
      student_user_id: number,
      name: string,
      date_of_birth: string,
      student_school_id: string
    },
  ]
}
```

#### POST /api/users/parent/:id/student

Add student to parent, id in param represents user id (parent)
Accepts:

```
{
  student_id: number            -- required
}
```

Returns:

```
{
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  address: string,
  email: string,
  role: string,
  updated_at: string,
  created_at: string,
  students: [
    {
      id: number,
      school_id: number,
      student_user_id: number,
      name: string,
      date_of_birth: string,
      student_school_id: string
    },
  ]
}
```

#### PUT api/users/:id

Update existing user record, id in param represents user id
Accepts any of these keys:

```
{
  username: string,
  first_name: string,
  last_name: string,
  address: string,
  email: string,
  role: string,
}
```

Returns:

```
{
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  address: string,
  email: string,
  role: string,
  updated_at: string,
  created_at: string
}
```

## Schools

#### GET /api/schools

Returns:

```
[
  {
    id: number,
    name: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    location_lat: string,
    location_lon: string
  }
]
```

#### GET /api/schools?name="value"

Accepts a query string in the url labeled name and will return all matches that include the string.
Returns:

```
[
  {
    id: number,
    name: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    location_lat: string,
    location_lon: string
  }
]
```

#### GET /api/schools/id

id param represents a school id
Returns:

```
{
  id: number,
  name: string,
  address: string,
  city: string,
  state: string,
  zip: string,
  location_lat: string,
  location_lon: string,
  classes: [
    {
      id: number,
      grade: string,
      class_identity: string
    }
  ],
  school_admin: {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    address: string,
    email: string,
    role: string,
    updated_at: string,
    created_at: string
  }
}
```

#### POST /api/schools

Accepts:

```
{
  school_admin_id: number,                -- required, represents the admin for the school
  name: string,                           -- required
  address: string,                        -- required
  city: string,                           -- required
  state: string,                          -- required
  zip: string,                            -- required
  location_lat: string,                   -- optional  used for geolocation
  location_lon: string                    -- optional  used for geolocation
}
```

Returns:

```
{
  id: number,
  name: string,
  address: string,
  city: string,
  state: string,
  zip: string,
  location_lat: string,
  location_lon: string,
  school_admin: {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    address: string,
    email: string,
    role: string,
    updated_at: string,
    created_at: string
  }
}
```

#### PUT /api/schools/:id

id in param represents school id
Accepts any of the following keys:

```
{
  school_admin_id: number,
  name: string,
  address: string,
  city: string,
  state: string,
  zip: string,
  location_lat: string,
  location_lon: string,
}
```

Returns:

```
{
  id: number,
  name: string,
  address: string,
  city: string,
  state: string,
  zip: string,
  location_lat: string,
  location_lon: string,
}
```

#### DELETE /api/schools/:id

id in param represents school id
Returns:

```
number                          -- represents how many records were removed
```

## Classes

#### GET /api/classes

Returns:

```
[
  {
    id: number,
    created_at: string,
    updated_at: string,
    school_id: number,
    teacher_id: number,
    grade: string,
    class_identity: string
  }
]
```

#### GET /api/classes/:id

id in param represents class id
Returns:

```
{
  id: number,
  grade: string,
  class_identity: string,
  school_id: number,
  teacher_id: number,
  created_at: string,
  updated_at: string,
  school: {
    id: number,
    name: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    location_lat: string,
    location_lon: string,
  }
  teacher: {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    address: string,
    email: string,
    role: string,
    updated_at: string,
    created_at: string
  },
  students: [
    {
      id: number,
      school_id: number,
      student_user_id: number,
      name: string,
      date_of_birth: string,
      student_school_id: string
    }
  ]
}
```

#### GET /api/classes/school/:id

id in param represents a school id
Returns:

```
[
  {
    id: number,
    grade: string,
    class_identity: string,
    created_at: string,
    updated_at: string,
  }
]
```

#### GET /api/classes/teacher/:id

id in param represents a user id for a teacher
Returns:

```
[
  {
    id: number,
    grade: string,
    class_identity: string,
    created_at: string,
    updated_at: string,
  }
]
```

#### GET /api/classes/student/:id

id in param represents a student id
Returns:

```
[
  {
    id: number,
    grade: string,
    class_identity: string,
    created_at: string,
    updated_at: string,
  }
]
```

#### POST /api/classes

Accepts:

```
{
  school_id: number,                      -- required
  teacher_id: number,                     -- required
  grade: string,                          -- required
  class_identity: string                  -- optional
}
```

Returns:

```
{
  id: number
  school_id: number,
  teacher_id: number,
  grade: string,
  class_identity,
  teacher: {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    address: string,
    email: string,
    role: string,
    updated_at: string,
    created_at: string
  }
}
```

#### POST /api/classes/:id/students

id in param represents a class id
Accepts:

```
[
  number                                -- numbers represent student ids
]
```

Returns:

```
  id: number,
  school_id: number,
  teacher_id: number,
  grade: string,
  class_identity,
  students: [
    {
      id: number,
      school_id: number,
      student_user_id: number,
      name: string,
      date_of_birth: string,
      student_school_id: string
    }
  ]
```

#### PUT /api/classes/:id

id in param represents a class id
Accepts any of the following keys:

```
{
  school_id: number,
  teacher_id: number,
  grade: string,
  class_identity: string
}
```

Returns:

```
{
  id: number,
  created_at: string,
  updated_at: string,
  school_id: number,
  teacher_id: number,
  grade: string,
  class_identity: string
}
```

#### DELETE /api/classes/:id

id in param represents class id
Returns:

```
{
  message: 'Class :id was deleted'
}
```

## Forms

#### GET /api/forms

Returns:

```
[
  {
    id: number,
    created_at: string,
    updated_at: string,
    master_form_id: number,
    school_id: number,
    class_id: number,
    parent_id: number,
    student_id: number,
    name: string,
    description: string,
    base_form_url: string,
    owner_signed_url: string,
    parent_signed_url: string,
    form_data: json
  }
]
```

#### GET /api/forms/:id

id in param represents a form id
Returns:

```
{
  id: number,
  created_at: string,
  updated_at: string,
  master_form_id: number,
  school_id: number,
  class_id: number,
  parent_id: number,
  student_id: number,
  name: string,
  description: string,
  base_form_url: string,
  owner_signed_url: string,
  parent_signed_url: string,
  form_data: json
}
```

#### GET /api/forms/master/:id

id in param represents the master form's id not the master_form_id column
Returns:

```
[
  {
    id: number,
    master_form_id: number,             -- If truly a master form this value will be null
    name: string,
    description: string,
    base_form_url: string,
    owner_signed_url: string,
    paren_signed_url: string,
    form_data: json
  }
]
```

#### GET /api/forms/master/school/:id

id in param represents a school id and returns all of the schools master forms
Returns:

```
[
  {
    id: number,
    master_form_id: number,             -- If truly a master form this value will be null
    name: string,
    description: string,
    base_form_url: string,
    owner_signed_url: string,
    paren_signed_url: string,
    form_data: json
  }
]
```

#### GET /api/forms/class/:id

id in param represents a class id and returns all forms keyed to the class
Returns:

```
[
  {
    id: number,
    master_form_id: number,
    name: string,
    description: string,
    base_form_url: string,
    owner_signed_url: string,
    paren_signed_url: string,
    form_data: json
  }
]
```

#### GET /api/forms/parent/:id

id in param represents a parent's user id and returns all forms heyed to the parent
Returns:

```
[
  {
    id: number,
    master_form_id: number,
    name: string,
    description: string,
    base_form_url: string,
    owner_signed_url: string,
    paren_signed_url: string,
    form_data: json
  }
]
```

#### GET /api/forms/student/:id

id in param represents a student record id and returns all forms keyed to a student
Returns:

```
[
  {
    id: number,
    master_form_id: number,
    name: string,
    description: string,
    base_form_url: string,
    owner_signed_url: string,
    paren_signed_url: string,
    form_data: json
  }
]
```

#### POST /api/forms

Add a new form, master_form_id should be null if creating a master form
Accepts:

```
{
  master_form_id: number,
  school_id: number,                    -- required, keys form to school
  class_id: number,                     -- only assign when keying to a class
  parent_id: number,                    -- only assign when keying to a parent
  student_id: number,                   -- only assign when keying to a student
  name: string,                         -- required
  description: string,                  -- required
  base_form_url: string,                -- stored image of base form
  owner_signed_url: string,             -- stored image of owner signed form
  parent_signed_url: string,            -- stored image of parent signed form
  form_data: json                       -- required, json data for the form
}
```

Returns:

```
{
  id: number,
  created_at: string,
  updated_at: string,
  master_form_id: number,
  school_id: number,
  class_id: number,
  parent_id: number,
  student_id: number,
  name: string,
  description: string,
  base_form_url: string,
  owner_signed_url: string,
  parent_signed_url: string,
  form_data: json
}
```

#### PUT /api/forms/:id

id in param represents form id
Accepts any of the following keys:

```
{
  master_form_id: number,
  school_id: number,
  class_id: number,
  parent_id: number,
  student_id: number,
  name: string,
  description: string,
  base_form_url: string,
  owner_signed_url: string,
  parent_signed_url: string,
  form_data: json
}
```

Returns:

```
{
  id: number,
  created_at: string,
  updated_at: string,
  master_form_id: number,
  school_id: number,
  class_id: number,
  parent_id: number,
  student_id: number,
  name: string,
  description: string,
  base_form_url: string,
  owner_signed_url: string,
  parent_signed_url: string,
  form_data: json
}
```

#### DELETE /api/forms/:id

id in param represents form id
Returns:

```
number                                -- represents records removed
```
