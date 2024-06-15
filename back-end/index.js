const express = require('express');
const { Sequelize, DataTypes, Model, QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const axios = require('axios');



app.use(cors());

app.use(express.json());
// use the database, root user, password of your database "lookylooky7"
const sequelize = new Sequelize('Jobs', 'root', '01033239589', {
  host: 'localhost',
  dialect: 'mysql'
});

class User extends Model {}
class Job extends Model {}

// JWT verification middleware
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['token'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'SECRET');
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).send({ message: 'No user found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send({ message: 'Failed to authenticate token' });
  }
};

// Define User model
User.init({
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
  gender: DataTypes.STRING,
  phone: DataTypes.STRING,
  accountType: DataTypes.STRING,
  jobSpeciality: DataTypes.STRING
}, {
  sequelize,
  modelName: 'User',
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }
});


// Define Job model
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
  email: DataTypes.STRING,
  skills: DataTypes.STRING,
  jobType: DataTypes.ENUM('Full Time', 'Part Time', 'Contract')
}, {
  sequelize,
  modelName: 'Job',
  timestamps: false // Set timestamps to false
});


// signup route
app.post('/signup', async (req, res) => {
  const { userName, password, email, gender, firstName, lastName, phone, accountType, jobSpeciality } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdAt = new Date();
  const updatedAt = new Date();
  console.log(req.body);

  try {
    await sequelize.query(
      'INSERT INTO `Users` (`id`,`userName`,`firstName`,`lastName`,`password`,`email`,`gender`,`phone`,`accountType`,`jobSpeciality`,`createdAt`,`updatedAt`) VALUES (DEFAULT,?,?,?,?,?,?,?,?,?,?,?);',
      {
        replacements: [userName, firstName, lastName, hashedPassword, email, gender, phone, accountType, jobSpeciality, createdAt, updatedAt],
        type: QueryTypes.INSERT,
      }
    );
    const user = await User.findOne({ where: { userName } });
    const token = jwt.sign({ id: user.id }, 'SECRET');
    res.send({ token });
  }
  catch (error) {
    res.send({ message: 'User already exists' });
  }
});
// login route
app.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ where: { userName } });           
  console.log(user)
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ message: 'Invalid email or password' });
  }
  const token = jwt.sign({ id: user.id }, 'SECRET');
  res.send({ token, user, accountType: user.accountType });
});


// job route
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


// Create a job route
app.post('/jobAdd', verifyToken, async (req, res) => {
  const { accountType, firstName, lastName } = req.user;

  if (accountType !== 'HR' && accountType !== 'Businessman') {
    return res.status(403).send({ message: 'You are not authorized to post jobs' });
  }

  try {
    const { jobTitle, company, skills, jobType, email } = req.body;
    const job = await Job.create({ jobTitle, company, skills, jobType, firstName, lastName, email });
    res.send(job);
  } catch (error) {
    console.log(error);
    res.send({ message: 'Error creating job' });
  }
});

// User search route
app.get('/users', async (req, res) => {
  const { speciality } = req.query;
  console.log(speciality);
  let users;

  if (speciality) {
    users = await User.findAll({
      where: {
        jobSpeciality: {
          [Sequelize.Op.like]: '%' + speciality + '%'
        }
      }
    });
  } else {
    users = await User.findAll({      where:{accountType:'Job seeker'}
  });
  }

  res.send(users);
});

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server started on port 3000'));
});