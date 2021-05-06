import { useEffect, useRef, useState } from "react";
import { ChatConteiner } from "./styled";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";


export default function Chat() {
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // trying
  const [messages, setMessages] = useState("")
  /** message
     * sender
     * receiver
     * text       */
  // setMessages([
  //   {
  //     message : "Hello",
  //     type : "received"
  //   },
  //   {
  //     message : "How is it going?",
  //     type : "sent"
  //   }
  // ])

  const appendMessage = ( msg, type ) => {
    const messagesString = messages + `
      <li className={${type}} > ${msg}  </li>
    `
    setMessages(messagesString)

    window.scrollTo(0, document.body.scrollHeight);
  }

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
   
    socket.on("message", data => {
      (( msg, type ) => {
        const messagesString = messages + `
          <li className={${type}} > ${msg} </li>
        `
        setMessages(messagesString)
    
        window.scrollTo(0, document.body.scrollHeight);
      })(data, 'received');

      window.scrollTo(0, document.body.scrollHeight);
    });

  }, [])

  function handleSubmit() {
    const socket = socketIOClient(ENDPOINT);
    const { value: inputValue } = inputRef.current;
    
    // console.dir(inputValue)

    if (inputValue) {
      socket.emit('chat message', inputValue);

      socket.on("message", data => {
        appendMessage(data, 'received')
  
        window.scrollTo(0, document.body.scrollHeight);
      });

      console.log(messages)
      inputRef.current.value = '';
    }
  }

  return (
    <ChatConteiner>
        <header>
          <h2>Usuário</h2>
          <h4 className="online status">online</h4>
        </header>
        
        {/* massages */}
        <ul 
          id="messages"
          ref={chatContainerRef}
        >
          { messages }
        </ul>
       
        <form 
          id="form"
          onSubmit={e => e.preventDefault()}
          >
          <input 
            id="input" 
            ref={inputRef}
            autocomplete="off" 
            placeholder="Type your message..."
          />
          <button type="submit" onClick={handleSubmit}>
            <svg height="30px" width="30px">
              <path d="M6.7,17.9v-3.7l4-1.8c0.4-0.2,0.4-0.7,0-0.9l-4-1.8V6.1L19.8,12L6.7,17.9z M23.7,11.5L5.4,3.3  c-0.1,0-0.1,0-0.2,0C5,3.3,4.7,3.5,4.7,3.8v5.9v4.8v5.9c0,0.3,0.2,0.5,0.5,0.5c0.1,0,0.1,0,0.2,0l18.3-8.2  C24.1,12.3,24.1,11.7,23.7,11.5z"></path>
            </svg>
          </button>

        </form>
      </ChatConteiner>
  )
}