const express = require('express');
const uuid = require('uuid');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));
app.use(express.json());

// The workouts and users are saved in memory and disappear whenever the service is restarted.
let users = {};
let workouts = {};
let friends = {};

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// Get all users
apiRouter.get('/users', (req, res) => {
  res.json(users);
});

// Get all workouts for the specified user
apiRouter.get('/workouts', (req, res) => {
  res.json(workouts);
});

// Add friend to a specific user
apiRouter.post('/friends', (req, res) => {
  if (users[req.body.userName] && users[req.body.friendName]) {
    if (!friends[req.body.userName]) {
      friends[req.body.userName] = [];
    }
  friends[req.body.userName].push(req.body.friendName);
  res.send({ msg: 'Friend added' });
  }
});

// Add a workout to a specific user
apiRouter.post('/workouts', (req, res) => {
  if (users[req.body.userName]) {
    if (!workouts[req.body.userName]) {
      workouts[req.body.userName] = [];
    }
    const newWorkout = { workout1: req.body.workout1, workout2: req.body.workout2, workout3: req.body.workout3, workout4: req.body.workout4, time: req.body.time, date: req.body.date };
    workouts[req.body.userName].push(newWorkout);
    res.send({ msg: 'Workout added' });
  }
});

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  console.log('Request body:', req.body); // Log the request body for debugging
  const user = users[req.body.userName];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const newUser = { userName: req.body.userName, email: req.body.email, password: req.body.password, token: uuid.v4() };
    users[newUser.userName] = newUser;
    res.send({ token: newUser.token });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = users[req.body.userName];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
