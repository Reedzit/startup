const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });
const db = client.db('startup');
const userCollection = db.collection('user');
const workoutsCollection = db.collection('workouts');
const friendsCollection = db.collection('friends');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function getUser(username) {
  console.log('Looking for user:', username);
  const result = await userCollection.findOne({ username: username}, { projection: {username: 1, email: 1, password: 1} });
  console.log('User:', result);
  if (!result) {
    return null;
  }
  return result;
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);
  await friendsCollection.insertOne({ username: username, friends: [] });
  await workoutsCollection.insertOne({ username: username, workouts: [] });

  return user;
}

async function updateUserToken(email, token) {
  return userCollection.updateOne({ email: email }, { $set: { token: token } });
}

async function addFriend(username, friend) {
  const result = await friendsCollection.updateOne(
    { username: username },
    { $addToSet: { friends: friend } } // Add friend to the friends array if not already present
  );
  return result;
}

async function getFriends(username) {
  const userFriends = await friendsCollection.findOne({ username: username }, { projection: {friends: 1, _id: 0} });
  if (!userFriends || !userFriends.friends || userFriends.friends.length === 0) {
    return [];
  }
  console.log('User friends:', userFriends.friends);
  return userFriends.friends;
}

async function addWorkout(username, workout) {
  // Parse the workout data if it's a string
  if (typeof workout === 'string') {
    workout = JSON.parse(workout);
  }

  const workoutWithId = { _id: new ObjectId(), ...workout };
  await workoutsCollection.updateOne(
    { username: username },
    { $push: { workouts: workoutWithId } },
    { upsert: true } // Create the document if it doesn't exist
  );
  return workoutWithId._id.toString(); // Return the ObjectId as a string
}

async function getWorkouts(username) {
  const userWorkouts = await workoutsCollection.findOne({ username: username }, { projection: {workouts: 1, _id: 0} });
  if (!userWorkouts || !userWorkouts.workouts || userWorkouts.workouts.length === 0) {
    return [];
  }
  return userWorkouts.workouts;
}

async function getSpecificWorkout(username, workoutId) {
  console.log('Looking for workout:', workoutId); 
  const userWorkout = await workoutsCollection.findOne({ username: username, 'workouts._id': new ObjectId(workoutId) }, { projection: { "workouts.$": 1 } });
  if (!userWorkout || !userWorkout.workouts || userWorkout.workouts.length === 0) {
    return null;
  }
  console.log('User workouts:', userWorkout);
  return userWorkout.workouts[0];
}

async function updateWorkoutTime(workoutId, time) {
  return workoutsCollection.updateOne(
    { 'workouts._id': new ObjectId(workoutId) },
    { $set: { 'workouts.$.time': time } }
  );
}

async function getLastWorkout(username) {
  console.log("getting last workout")
  const userWorkouts = await workoutsCollection.findOne({ username: username }, { projection: {workouts: 1, _id: 0 } });
  console.log('User workouts:', userWorkouts);
  if (userWorkouts.workouts.length === 0) {
    return null;
  }
  const lastWorkout = userWorkouts.workouts[userWorkouts.workouts.length - 1];
  console.log('Last workout:', lastWorkout);
  return lastWorkout;
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  updateUserToken,
  addFriend,
  getFriends,
  addWorkout,
  getWorkouts,
  getSpecificWorkout,
  updateWorkoutTime,
  getLastWorkout,
};