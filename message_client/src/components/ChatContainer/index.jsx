import { useEffect, useRef, useState } from "react";
import { ChatConteiner } from "./styled";

import Message from '../Message'

/** message
     * sender
     * receiver
     * text       */
  // setMessages([
  //   {
  //     message : "Hello",
  //     type : "received"
  //     sender : "socket.id"
  //   },
  // ])

export default function Chat({ onSendMessage, channel }) {
  const inputRef = useRef(null);
  // const chatContainerRef = useRef(null);

  // trying
  const [message, setMessage] = useState("")
  

  const send = () => {
    let  { inputValue } = message;
    console.log("send", channel, inputValue)

    if (inputValue && inputValue != '') {
      onSendMessage(channel.id, inputValue);
      setMessage({inputValue: ""});
      inputRef.current.value = "";
    }
  }
  
  useEffect(()=>{console.log(channel)}, [channel])

  const handleInput = e => {
    setMessage({inputValue: e.target.value})
  }

  return (
    <ChatConteiner>
      { channel ?
        <>
          <header>
            <h2>{channel.name}</h2>
            <h4 className="online status">online</h4>
          </header>
          
          {/* massages */}
          <ul id="messages">
            { 
              // useEffect(()=>{}, [channel.message])
              channel.messages ? (
                channel.messages.map(e=> {
                  return (
                    <>
                      <Message senderName={e.senderName} message={e.text}/>
                    </>
                  )
                }) 
              ) : <h1 className="emptyChat chatAlert">No messages</h1>
            }

          </ul>
        
          <form 
            id="form"
            onSubmit={e => e.preventDefault()}
            >
            <input 
              id="input" 
              ref={inputRef}
              onChange={handleInput}
              autoComplete="off" 
              placeholder="Type your message..."
            />
            <button type="submit" onClick={send}>
              <svg height="30px" width="30px">
                <path d="M6.7,17.9v-3.7l4-1.8c0.4-0.2,0.4-0.7,0-0.9l-4-1.8V6.1L19.8,12L6.7,17.9z M23.7,11.5L5.4,3.3  c-0.1,0-0.1,0-0.2,0C5,3.3,4.7,3.5,4.7,3.8v5.9v4.8v5.9c0,0.3,0.2,0.5,0.5,0.5c0.1,0,0.1,0,0.2,0l18.3-8.2  C24.1,12.3,24.1,11.7,23.7,11.5z"></path>
              </svg>
            </button>

          </form>
        </>
        : <h1 className="chatAlert">Select a communication channel</h1>
      } 
    </ChatConteiner>

  )
}