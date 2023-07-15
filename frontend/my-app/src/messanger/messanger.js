import "./messanger.css";
import Conversation from "../conversations/Conversation";
import Message from "../message/message";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {io} from "socket.io-client";

export default function Messanger() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
  const [users, setUsers] = useState([]);
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

  const handleLooKProfile = () => {
    window.location.href = `/user/${user._id}`;
  };
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

  useEffect(() => {
    axios
      .get(`http://localhost:7070/api/users/${userId}`)
      .then((res) => {
        setUser(res.data);
        socket.current.emit("addUser", userId);
      })
      .catch((err) => console.error(err));
  }, [userId, socket]);
  
  useEffect(() => {
    axios
      .get("http://localhost:7070/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredConversations = conversations.filter((conversation) => {
    const memberNames = conversation.members.map((memberId) => {
      const member = users.find((user) => user._id === memberId);
      return member ? member.name.toLowerCase() : "";
    });
  
    const searchString = searchQuery.toLowerCase();
    return memberNames.some((name) => name.includes(searchString));
  });

  return (
    <div className="messanger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
        <input
    placeholder="Search for friends"
    className="chatMenuInput"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
              {filteredConversations.map((c) => (
        <div key={c._id} onClick={() => setCurrentChat(c)}>
          <Conversation conversation={c} currentUser={user} />
        </div>
      ))}

        </div>
      </div>
      <div className="chatBox">
        
      <div className="chatBoxWrapper">
  <div className="div_chat_sticky">
    {currentChat?.members.map((memberId) => {
      if (memberId !== user?._id) {
        const member = users.find((user) => user._id === memberId);
        if (member) {
          return (
            <div className="div_chat_sticky_details" key={member._id}>
              <img
                src={`http://localhost:7070/${member.imagePaths}`}
                alt="Profile"
                className="profilePicture"
                onClick={handleLooKProfile}
              />
              <p className="username">{member.name}</p>
            </div>
          );
        }
      }
      return null;
    })}
  </div>
  {currentChat ? (
    <>
      <div className="chatBoxTop">
        {messages.map((m) => (
          <div ref={scrollRef}>
            <Message message={m} own={m.sender === user?._id} />
          </div>
        ))}
      </div>

      <div className="chatBoxBottom">
        <textarea
          className="chatMessageInput"
          placeholder="write something..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        ></textarea>
        <button className="chatSubmitButton" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </>
  ) : (
    <span className="noConversationText">
      Open a conversation to start a chat.
    </span>
  )}
</div>

      </div>
     
    </div>
  );
}