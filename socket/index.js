const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    if (!users.some((user) => user.userId === userId)) {
      users.push({ userId, socketId });
      console.log(`User added: userId=${userId}, socketId=${socketId}`);
    } else {
      console.log(`User already exists: userId=${userId}`);
    }
  };
  
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    console.log("a user connected.");
  
    socket.on("addUser", (userId) => {
      console.log(userId)
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      if (user) {
        if (user.socketId) {
          io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
          });

          // Create a notification element
          const notification = document.createElement("div");
          notification.classList.add("notification");
          notification.textContent = `New message from ${senderId}: ${text}`;

          // Append the notification to the page
          const notificationsContainer = document.getElementById("notificationsContainer");
          notificationsContainer.appendChild(notification);

          // Automatically remove the notification after a certain time
          setTimeout(() => {
            notification.remove();
          }, 5000);

        } else {
          console.log("User is not currently online.");
        }
      } else {
        console.log("User does not exist.");
      }
    });
  
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
  