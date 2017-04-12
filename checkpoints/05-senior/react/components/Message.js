import React from 'react';

export default ({fullMessage, markAsRead}) => (
  // `markAsRead` should be called with the id
  // if the user clicks anywhere on the message, mark it as read 
  <div onClick={() => markAsRead(fullMessage.id)}>
    <h1>From: <span>{fullMessage.from.email}</span></h1>
    <h2>To: <span>{fullMessage.to.email}</span></h2>
    <h3>Subject: <span>{fullMessage.subject}</span></h3>
    <p>{fullMessage.body}</p>
  </div>
);