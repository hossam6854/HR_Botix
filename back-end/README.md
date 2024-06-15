# Back-End Setup Guide

## Project Overview

This project is a back-end application for managing user registrations and job listings. It uses Node.js with Express.js framework and MySQL database, integrated via Sequelize ORM. This guide will help you set up the project, run the database, and understand the code and schema relationships.

## Technologies Used

 -   Node.js: JavaScript runtime for building server-side applications.
 -   Express.js: Web framework for Node.js.
 -   Sequelize: ORM for Node.js to interact with MySQL database.
 -   MySQL: Relational database management system.
 -   bcrypt: Library to hash passwords.
 -   jsonwebtoken: Library to handle JSON Web Tokens for authentication.
 -   cors: Middleware for handling Cross-Origin Resource Sharing.

## Prerequisites

1. Node.js: Ensure Node.js is installed on your machine.
2. MySQL: Ensure MySQL server is installed and running.

## Setup Instructions

1. install dependencies:

```bash
npm install
```

2. Configure MySQL Database:

 - Create the database and tables using the provided `schema.sql`
 - Insert demo data using `demo_data.sql`

3. Start the Server:

```bash
npm run start
```
The server will start on port 3000

## Code explanation

### Initial Setup

#### Importing modules

```js
const express = require('express');
const { Sequelize, DataTypes, Model, QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
```

 - **express**: The Express.js framework to build the web server.
 - **Sequelize, DataTypes, Model, QueryTypes**: Components of Sequelize ORM. Sequelize is used for database operations, DataTypes for defining model attributes, Model for creating models, and QueryTypes for raw SQL queries.
 - **bcrypt**: Library to hash passwords securely.
 - **jsonwebtoken**:  Library to generate and verify JSON Web Tokens for authentication.
 - **app**: Creates an instance of an Express application.
 - **cors**: Middleware for handling Cross-Origin Resource Sharing.


#### Middleware

```js 
app.use(cors());
app.use(express.json());
```

- `app.use(cors())`: Applies CORS middleware to allow cross-origin requests.
- `app.use(express.json())`: Middleware to parse JSON bodies of incoming requests.


#### Database Connection

```js
const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});
```

**Sequelize instance**: Connects to the MySQL database named 'Jobs' using the username 'user' and password 'password'. The `host` specifies the database server (localhost), and `dialect` specifies the type of database (MySQL).

#### Models

##### User Model

```js
class User extends Model {}

User.init({
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
  gender: DataTypes.STRING,
  phone: DataTypes.STRING,
  accountType: DataTypes.STRING
}, {
  sequelize,
  modelName: 'User',
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }
});
```

- **User Model**: Defines the User model with attributes `firstName`, `lastName`, `password`, `email`, `gender`, `phone`, and `accountType`.
- **Model Initialization**: Uses `User.init` to initialize the model with attribute definitions.
- **Hooks**: Adds a `beforeCreate` hook to hash the user's password using bcrypt before saving it to the database.


##### Job Model

```js
class Job extends Model {}

Job.init({
  jobTitle: DataTypes.STRING,
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  company: DataTypes.STRING,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  skills: DataTypes.STRING,
  jobType: DataTypes.ENUM('Full Time', 'Part Time', 'Contract')
}, {
  sequelize,
  modelName: 'Job',
  timestamps: false // Set timestamps to false
});
```

- **Job Model**: Defines the Job model with attributes `jobTitle`, `createdAt`, `company`, `firstName`, `lastName`, `skills`, and `jobType`.
- **Model Initialization**: Uses `Job.init` to initialize the model with attribute definitions.
- **timestamps**: Disables timestamps for the model.


#### Routes

##### Signup Route

```js
app.post('/signup', async (req, res) => {
  const { password, email, gender, firstName, lastName, phone, accountType } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdAt = new Date();
  const updatedAt = new Date();

  await sequelize.query(
    'INSERT INTO `Users` (`id`,`firstName`,`lastName`,`password`,`email`,`gender`,`phone`,`accountType`,`createdAt`,`updatedAt`) VALUES (DEFAULT,?,?,?,?,?,?,?,?,?);',
    {
      replacements: [firstName, lastName, hashedPassword, email, gender, phone, accountType, createdAt, updatedAt],
      type: QueryTypes.INSERT,
    }
  );

  const user = await User.findOne({ where: { email } });
  const token = jwt.sign({ id: user.id }, 'SECRET');
  res.send({ token });
});
```

- **Signup Route**: Handles POST requests to `/signup` to create a new user.
- **Request Body**: Extracts user details from the request body.
- **Hash Password**: Hashes the user's password using bcrypt.
- **Insert Query**: Executes a raw SQL query to insert the user details into the `Users` table.
- **Find User**: Retrieves the newly created user from the database.
- **Generate Token**: Generates a JSON Web Token using the user's ID.
- **Response**: Sends the token as a response.

#### Login Route

```js
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ message: 'Invalid email or password' });
  }
  const token = jwt.sign({ id: user.id }, 'SECRET');
  res.send({ token });
});
```

- **Login Route**: Handles POST requests to `/login` to authenticate a user.
- **Request Body**: Extracts email and password from the request body.
- **Find User**: Retrieves the user from the database based on the email.
- **Check Password**: Compares the hashed password with the user's password using bcrypt.
- **Invalid Credentials**: Sends an error response if the user is not found or the password is incorrect.
- **Generate Token**: Generates a JSON Web Token using the user's ID.
- **Response**: Sends the token as a response.


#### Job Listing Routes

```js
app.get('/jobs', async (req, res) => {
  const { title } = req.query;
  let jobs;

  if (title) {
    jobs = await Job.findAll({
      where: {
        jobTitle: {
          [Sequelize.Op.like]: '%' + title + '%'
        }
      }
    });
  } else {
    jobs = await Job.findAll();
  }

  res.send(jobs);
});
```

- **Job Listing Routes**: Handles GET requests to `/jobs` to retrieve job listings.
- **Query Parameters**: Extracts the `title` query parameter from the request.
- **Find Jobs**: Retrieves job listings from the database based on the title query parameter.
- **Response**: Sends the job listings as a response.


#### Synchronize Sequelize with Database

```js
sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server started on port 3000'));
});
```

- **Synchronize Sequelize**: Syncs the Sequelize models with the database.
- **Start Server**: Starts the Express server on port 3000.


### Database Schema

#### User Table
##### Fields:

1. `id`: Primary key, auto-incremented.
2. `firstName`: User's first name.
3. `lastName`: User's last name.
4. `email`: User's email, must be unique.
5. `password`: User's hashed password.
6. `gender`: User's gender.
7. `phone`: User's phone number.
8. `accountType`: Type of user account.
9. `createdAt`: Timestamp when the user was created.
10. `updatedAt`: Timestamp when the user was last updated.

#### Job Table

##### Fields:

1. `id`: Primary key, auto-incremented.
2. `jobTitle`: Title of the job.
3. `createdAt`: Timestamp when the job was created.
4. `company`: Company offering the job.
5. `firstName`: First name of the contact person for the job.
6. `lastName`: Last name of the contact person for the job.
7. `skills`: Skills required for the job.
8. `jobType`: Type of job (Full Time, Part Time, Contract).

The **User** and **Job** tables are independent without direct foreign key relationships.
The **User** table stores user registration information, while the **Job** table stores job listing information. This design allows for easy extension and maintenance of the database schema.

