const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const existingUser = await DB.getUser(req.body.email);
  if (existingUser) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.userName, req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.status(200).send({
      id: user._id,
    });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.userName);
  if (user) {
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (isPasswordValid) {
      user.token = uuid.v4();
      await DB.updateUserToken(user.email, user.token);
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});



// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Add friend to a specific user
secureApiRouter.post('/friends', async (req, res) => {
  const userName = req.body.userName;
  const friend = req.body.friendName;
  const checkFriend = await DB.getUser(friend);
  if (!checkFriend) {
    res.status(404).send({ msg: 'Friend not found' });
    return;
  }
  const dbFriend = await DB.addFriend(userName, friend);
  if (dbFriend) {
    res.send({ msg: 'Friend added' });
  } else {
    res.status(404).send({ msg: 'Friend not added' });
  }
});

// Get friends list for a specific user with last workout time and date
apiRouter.get('/friends/:userName', async (req, res) => {
  const userName = req.params.userName;
  const allFriends = await DB.getFriends(userName);
  if (allFriends.length === 0) {
    res.status(404).send({ msg: 'No friends found for this user' });
    return;
  }

  const friendsList = await Promise.all(allFriends.map(async friend => {
    const lastWorkout = await DB.getLastWorkout(friend);
    return {
      friendName: friend,
      lastWorkoutTime: lastWorkout ? lastWorkout.time : 'NA',
      lastWorkoutDate: lastWorkout ? lastWorkout.date : 'NA'
    };
  }));

  res.json(friendsList);
});

// Add a workout to a specific user
apiRouter.post('/workout/create', async (req, res) => {
  console.log('Request body:', req.body); // Log the request body for debugging
  const user = await DB.getUser(req.body.userName);
  if (user) {
    const workoutId = await DB.addWorkout(req.body.userName, req.body.workout);
    res.send({ msg: 'Workout added', workoutId: workoutId });
  } else {
    res.status(404).send({ msg: 'User not found' });
  }
});

// Finish a workout for a specific user
secureApiRouter.put('/workout/finish', async (req, res) => {
  console.log('Request body:', req.body); // Log the request body for debugging
  const user = await DB.getUser(req.body.userName);
  console.log('workoutId:', req.body.workoutId);  
  if (user) {
    const workout = await DB.getSpecificWorkout(req.body.userName, req.body.workoutId);
    if (workout) {
      // workout.time = req.body.time;
      await DB.updateWorkoutTime(workout._id, req.body.time);
      res.send({ msg: 'Workout finished' });
      return;
    }
  }
  res.status(404).send({ msg: 'Workout not found' });
});

// get all workouts for a specified user
secureApiRouter.get('/workouts/:userName', async (req, res) => {
  const userName = req.params.userName;
  const userWorkouts = await DB.getWorkouts(userName);
  if (userWorkouts.length === 0) {
    res.status(404).send({ msg: 'No workouts found for this user' });
    return;
  }
  res.send(userWorkouts);
});


const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
