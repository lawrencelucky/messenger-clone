import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  IconButton,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

import './App.css';

import db from './firebase';

import Message from './Message';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, []);

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            message: doc.data(),
          }))
        )
      );
  }, []);

  const sendMessage = e => {
    e.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setMessages([...messages, { username, text: input }]);
    setInput('');
  };

  return (
    <div className='app'>
      <img
        src='https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100'
        alt=''
      />
      <h2>Welcome {username}</h2>
      <form className='app__form'>
        <FormControl className='app__formControl'>
          <Input
            placeholder='Enter a message'
            value={input}
            onChange={e => setInput(e.target.value)}
            className='app__input'
          />
          <IconButton
            variant='contained'
            color='primary'
            type='submit'
            onClick={sendMessage}
            disabled={!input}
            className='app__iconButton'
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} message={message} username={username} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
