import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);


 
  return (
    <div className="conversation">
     <img className="conversationImg" src="https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s900-c85.webp"></img>
     <span className="conversationName">Malina</span>
     <div className="chatOnlineBadge"></div>
    </div>
  );
}