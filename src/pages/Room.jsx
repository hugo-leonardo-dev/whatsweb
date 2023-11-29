import React, { useState, useEffect, useRef } from 'react';
import client, { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../appwriteConfig';
import { ID, Query, Role, Permission } from 'appwrite';
import Header from '../components/Header';
import { userAuth } from '../utils/AuthContext';

const Room = () => {

  const {user} = userAuth();
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState();
  const holdTimeoutRef = useRef(null);

  useEffect(() => {

    getMessages();

    const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
        
      if(response.events.includes("databases.*.collections.*.documents.*.create")){
          setMessages(prevState => [...prevState, response.payload])
      }
  
      if(response.events.includes("databases.*.collections.*.documents.*.delete")){
          setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
      }
  
  });
  

    return () => {
        unsubscribe();
    }

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      user_id:user.$id,
      username:user.name,
      body: messageBody,
    };

    let permissions = [
      Permission.write(Role.user(user.$id))
    ]

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload,
      permissions
    );

    setMessageBody('');
  };

  const getMessages = async () => {
    const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID_MESSAGES,
        [
            Query.orderAsc('$createdAt'),
            Query.limit(100),
        ]
    )
    console.log(response.documents)
    setMessages(response.documents)
}

  const deleteMessage = (messageId) => {
    databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, messageId);
    //setMessages((prevState) => prevState.filter((message) => message.$id !== messageId));
  };

  const handleMouseDown = (messageId) => {
    holdTimeoutRef.current = setTimeout(() => {
      deleteMessage(messageId);
    }, 500);
  };

  const handleMouseUp = () => {
    clearTimeout(holdTimeoutRef.current);
  };

  return (
    <main className="container">
      <Header />
      <div className="room--container">
        <div>
          {messages.map((message) => (
            <div
              key={message.$id}
              className={`message--wrapper ${message.user_id === user.$id ? '' : 'other'}`}
              onMouseDown={() => handleMouseDown(message.$id)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div className={`message--body ${message.user_id === user.$id ? '' : 'other'}`}>
                <p className='message--owner'>
                  {message?.username ? (
                    <span>{message.username}</span>
                  ) :
                    (<span>Anônimo</span>)
                  }
                </p>
                <span>
                  {message.body}
                  <small className="message--timestamp">
                    {new Date(message.$createdAt).toLocaleString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </small>
                </span>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} id="message--form">
          <div>
            <textarea
              className='message--input'
              required
              maxLength="1000"
              placeholder="Digite sua mensagem"
              onChange={(e) => {
                setMessageBody(e.target.value);
              }}
              value={messageBody}
            ></textarea>
          </div>
          <div className="send-btn--wrapper">
            <input type="submit" value="Enviar" className="btn btn--secondary" />
          </div>
        </form>
      </div>
    </main>
  );
};

export default Room;
