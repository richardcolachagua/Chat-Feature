import React, {useState, useEffect} from "react";
import io from 'socket.io-client'
import { Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

// Set up SocketIO client
const socket = io('http://localhost:3000')

// Define React component
function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

// Handle incoming chat messages
useEffect(() => {
    socket.on('chat message', (msg) => {
        setMessages((messages) => [...messages, msg]);
    });
},
[]);

// Handle sending chat messages
const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('chat message', inputValue);
    setInputValue('');
 };

 // Render chat interface

 return (
  <Container maxWidth="sm">
<List>
    {messages.map((msg, index) => (
        <ListItem key={index}>
            <ListItemText primary={msg} />
        </ListItem>
    ))}
    <form onSubmit={handleSubmit}>
        <TextField
        label="Message"
        variant="outlined"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
       />
    <Button type="submit" variant="contained" color="primary">
        Send
            </Button>
    
        </form>
    </List>    
</Container>
 )
}

export default Chat;