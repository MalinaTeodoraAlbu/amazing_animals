import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const picture = user ? `http://localhost:7070/${user.imagePaths}` : '';


  useEffect(() => {
    if (currentUser && conversation) {
      const friendId = conversation.members.find((m) => m !== currentUser._id);

      const getUser = async () => {
        try {
          const res = await axios.get(`http://localhost:7070/api/users/${friendId}`);
          setUser(res.data);
        } catch (err) {
          console.log(err);
        }
      };

      getUser();
    }
  }, [currentUser, conversation]);
  
  return (
    <div className="conversation">
     <img className="conversationImg" src={picture}></img>
     <span className="conversationName">{user?.name}</span>
     <div className="chatOnlineBadge"></div>
    </div>
  );
}