import "./messanger.css";
import Conversation from "../conversations/Conversation";
import Message from "../message/message";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {io} from "socket.io-client";

export default function Messanger() {
  const [user, setUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:7070/api/users/${userId}`)
        .then(res => {
          setUser(res.data);
          socket.current.emit("addUser", userId);
        })
        .catch(err => console.error(err));
    }
  }, [userId, socket]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:7070/api/users/${userId}`)
        .then(res => {
          setUser(res.data);
        })
        .catch(err => console.error(err));
    }
  }, []);

  useEffect(() => {

      axios.get(`http://localhost:7070/api/conversation/${userId}`)
        .then(res => {
          setConversations(res.data);
        })
        .catch(err => 
          console.error(err));

  }, [userId]);

  useEffect(() => {
    if (currentChat) {
      const getMessages = async () => {
        try {
          const res = await axios.get(`http://localhost:7070/api/message/${currentChat._id}`);
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
      };
  
      getMessages();
    }
  }, [currentChat]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
  
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await  axios.post("http://localhost:7070/api/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="messanger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {[conversations].map((c) => (
          <div key={c._id} onClick={() => setCurrentChat(c)}>
            <Conversation conversation={c} currentUser={user} />
          </div>
        ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {
            currentChat ?(
          <>
          <div className="chatBoxTop">
          {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}

</div>

          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="write something..."
              onChange={(e)=>setNewMessage(e.target.value)}
              value={newMessage}
            ></textarea>
            <button className="chatSubmitButton" onClick={handleSubmit}>Send </button>
          </div>
</ > ):( <span className="noConversationText"> Open a conversation to start a chat.</span>)}
        </div> 
      </div>
     
    </div>
  );
}
