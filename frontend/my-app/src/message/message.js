import "./message.css";
import { format } from "timeago.js";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Message({ message, own }) {
  const [user, setUser] = useState(null);
  const picture = user ? `http://localhost:7070/${user.imagePaths}` : '';
  useEffect(() => {
    axios.get(`http://localhost:7070/api/users/${message.sender}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={picture}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
