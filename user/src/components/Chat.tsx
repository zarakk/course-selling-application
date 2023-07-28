import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import {
  Box,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import { usernameState } from "../state/usernameState";
const socket = io("http://localhost:3000/", {
  transports: ["websocket", "polling", "flashsocket"],
}); // Replace with your server URL

const ChatContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

interface Message {
  user: string;
  text: string;
}

export default function Chat() {
  const socketRef = useRef<any>();
  const listRef = useRef<HTMLLIElement | null>(null);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [username] = useRecoilState(usernameState);

  useEffect(() => {
    // Initialize the socket.io client
    socketRef.current = io("http://localhost:3000/", {
      transports: ["websocket", "polling", "flashsocket"],
    }); // Replace with your server URL

    // Listen for incoming messages from the server
    socketRef.current.on("chat message", (message: Message) => {
      setMessages((messages) => [...messages, message]);
    });

    // Clean up the listener and disconnect the socket when the component unmounts
    return () => {
      socketRef.current?.off("chat message");
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const handleToggleOpen = () => {
    setOpen((open) => !open);
  };

  const handleSendMessage = () => {
    if (newMessage && username) {
      socket.emit("chat message", { user: username, text: newMessage });
      setNewMessage("");
    }
  };

  return (
    <ChatContainer
      sx={{ border: "1px solid black", padding: 2, backgroundColor: "white" }}
    >
      <Button onClick={handleToggleOpen}>Chat</Button>
      <Collapse in={open}>
        <List
          sx={{
            height: 200,
            overflowY: "scroll",

            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {messages.map((message, index) => (
            <ListItem key={index} ref={listRef}>
              <ListItemText
                primary={message.text}
                secondary={`Sent by ${message.user}`}
              />
            </ListItem>
          ))}
        </List>
        <div>
          <TextField
            label="Message"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </Collapse>
    </ChatContainer>
  );
}
