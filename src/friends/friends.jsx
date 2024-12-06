import React, { useEffect, useState } from 'react';
import './friends.css';

export function Friends({ userName }) {
  const [friendName, setFriendName] = useState('');
  const [friendList, setFriendList] = useState([]);
  const imageUrl = '/images/grimReaperWithFriends.png';

  const fetchFriends = async () => {
    try {
      const response = await fetch(`api/friends/${userName}`);
      if (response.ok) {
        const data = await response.json();
        setFriendList(data);
      } else {
        console.error('Failed to fetch friends list');
      }
    } catch (error) {
      console.error('Error fetching friends list:', error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, [userName]);

  const handleAddFriend = async () => {
    try {
      const response = await fetch('api/friends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, friendName }),
      });

      if (response.ok) {
        fetchFriends();
        setFriendName('');
      } else {
        console.error('Failed to add friend');
      }
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  return (
    <main className="container-fluid flex-grow-1 bg-dark text-secondary">
      <h1 className="text-center mt-2">Conquer the Deck of Death with Friends</h1>
      <div className="d-flex justify-content-center align-items-center mt-2">
        <img className="img-fluid" src={imageUrl} alt="Grim Reaper With Friends" width="250" height="250" />
      </div>      <div className="justify-content-center align-self-center">
        <input
          className="bg-light m-2 form-control rounded"
          type="text"
          placeholder="Friend's name"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        />
      </div>
      <div className="justify-content-center align-self-center">
        <button className="btn btn-light mx-2" type="submit" onClick={handleAddFriend}>Add</button>
      </div>
      <div className="mt-3">
        <h2 className="d-flex justify-content-center align-items-center">Friends List</h2>
        <div className="d-flex justify-content-center">
          <table className="table table-dark table-striped table-bordered text-center w-auto text-secondary">
            <thead>
              <tr>
                <th>Friend</th>
                <th>Most Recent Time</th>
                <th>Last Workout Date</th>
              </tr>
            </thead>
            <tbody>
              {friendList.map((friend, index) => (
                <tr key={index}>
                  <td className="text-secondary">{friend.friendName}</td>
                  <td className="text-secondary">{friend.lastWorkoutTime}</td>
                  <td className="text-secondary">{friend.lastWorkoutDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}