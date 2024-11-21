const express = require('express');
const uuid = require('uuid');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));
app.use(express.json());

// The workouts and users are saved in memory and disappear whenever the service is restarted.
let users = {};
let workouts = {};
let allFriends = {};

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// Get all users
apiRouter.get('/users', (req, res) => {
  res.json(users);
});

// Get all workouts 
apiRouter.get('/workouts', (req, res) => {
  res.json(workouts);
});

apiRouter.get('/allfriends', (req, res) => {
  res.json(allFriends);
}); 

// get all workouts for a specified user
apiRouter.get('/workouts/:userName', (req, res) => {
  const userName = req.params.userName;
  if (workouts[userName]) {
    res.json(workouts[userName]);
  } else {
    res.status(404).send({ msg: 'No workouts found for this user' });
  }
});

// Add friend to a specific user
apiRouter.post('/friends', (req, res) => {
  const { userName, friendName } = req.body;
  if (users[userName] && users[friendName]) {
    if (!allFriends[userName]) {
      allFriends[userName] = [];
    }
    if (!allFriends[userName].includes(friendName)) {
      allFriends[userName].push(friendName);
      res.send({ msg: 'Friend added' });
    } else {
      res.status(409).send({ msg: 'Friend already added' });
    }
  } else {
    res.status(404).send({ msg: 'User or friend not found' });
  }
});

// get friends list for a specific user with last workout time and date
apiRouter.get('/friends/:userName', (req, res) => {
  const userName = req.params.userName;
  if (allFriends[userName]) {
    const friendsList = allFriends[userName].map(friend => {
      const lastWorkout = workouts[friend] ? workouts[friend][workouts[friend].length - 1] : null;
      return {
        friendName: friend,
        lastWorkoutTime: lastWorkout ? lastWorkout.time : 'NA',
        lastWorkoutDate: lastWorkout ? lastWorkout.date : 'NA'
      };
    });
    res.json(friendsList);
  } else {
    res.status(404).send({ msg: 'No friends found for this user' });
  }
});

// Add a workout to a specific user
apiRouter.post('/workout/create', (req, res) => {
  console.log('Request body:', req.body); // Log the request body for debugging
  if (users[req.body.userName]) {
    if (!workouts[req.body.userName]) {
      workouts[req.body.userName] = [];
    }
    const workout = JSON.parse(req.body.workout);
    const newWorkout = { ...workout,  time: "NA" , date: workout.date };
    workouts[req.body.userName].push(newWorkout);
    res.send({ msg: 'Workout added' });
  }
});

// Finish a workout for a specific user
apiRouter.put('/workout/finish', (req, res) => {
  console.log('Request body:', req.body); // Log the request body for debugging
  if (users[req.body.userName]) {
    if (workouts[req.body.userName]) {
      const workout = workouts[req.body.userName].find((w) => deepEqual(w, req.body.workout));
      if (workout) {
        workout.time = req.body.time;
        res.send({ msg: 'Workout finished' });
        return;
      }
    }
  }
  res.status(404).send({ msg: 'Workout not found' });
});

// Utility function to compare objects
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  if (obj1 == null || obj2 == null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (key === 'time') {
      continue;
    }
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  console.log('Request body:', req.body); // Log the request body for debugging
  const user = users[req.body.userName];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const newUser = { userName: req.body.userName, email: req.body.email, password: req.body.password, token: uuid.v4() };
    users[newUser.userName] = newUser;
    allFriends[newUser.userName] = [];
    workouts[newUser.userName] = [];
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
