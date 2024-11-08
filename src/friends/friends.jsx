import React from 'react';
import './friends.css';


export function Friends() {
  const [imageUrl, setImageUrl] = React.useState('');
  const [friendName, setFriendName] = React.useState('');
  const [friendList, setFriendList] = React.useState([]);

  const handleAddFriend = () => {
    if (friendName.trim() !== '') {
      setFriendList([...friendList, friendName]);
      setFriendName('');
    }
  };

  React.useEffect (() => {
    setImageUrl('/images/grimReaperWithFriends.png');
  }, []);

  return(
    <main className="container-fluid flex-grow-1 bg-dark text-secondary">
      <h1 className="container-fluid text-center mt-2">Conquer the Deck of Death with Friends</h1>
      <div className="d-flex justify-content-center align-items-center mt-2">
        <img className="img-fluid" src={imageUrl} alt="Grim Reaper With Friends" width="250" height="250" />
      </div>
      <h2 className="d-flex justify-content-center align-items-center mt-3">Add a Friend</h2>
      <div className="justify-content-center align-self-center">
        <input 
        className="bg-light m-2 form-control rounded" 
        type="text" 
        placeholder="Friend's name" 
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
        />
      </div>
      <div className="justify-content-center align-self-center">
        {/* <button className="btn btn-light mx-2" type="submit">Find</button> */}
        <button className="btn btn-light mx-2" type="submit" onClick={handleAddFriend}>Add</button>
      </div>
      <div className="mt-3">
        <h2 className="d-flex justify-content-center align-items-center">Friends List</h2>
        <div className="d-flex justify-content-center">
          <table className="table table-dark table-striped table-bordered text-center w-auto text-secondary">
            <thead>
              <tr>
                <th>Friend</th>
                <th>Best Time</th>
                <th>Last Workout Date</th>
              </tr>
            </thead>
            <tbody>
              {friendList.map((friend) => (
                <tr id="friend">
                  <td className="text-secondary" id="friend name">{friend}</td>
                  <td className="text-secondary" id="time"> 5 seconds</td>
                  <td className="text-secondary" id="date"> 04/60/2008</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}