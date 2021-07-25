import styled from "styled-components";

export const ChatConteiner = styled.div`
  display: grid;
  grid-template-rows: 3.6rem auto 3rem;

  padding-bottom: 1.5rem;
  
  header {
    padding-top: 0.5rem;  

  }

  header h2.channel-title {
    color: #595a5b;  
    font-size: 1.3rem;
    font-weight: 400;
  }
  
  
/* Messages */
  #messages {
    height: 100%;
    width: 100%;
    max-width: 95%;
    margin: auto;

    overflow-x: auto;
    z-index: 10;

    /* background-color: #595a5b; */

  }

  .chat-alert {
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;

    align-items: center;
  }

  #form { 
    display: flex; 
    padding: 0.25rem; 
    width: 100%;


    align-items: center;

    /* position: absolute;  */

    bottom: 2.4rem; 
    left: 0; 
    right: 0; 

    height: 3rem;   
    margin: 0 auto;

    max-width: 95%;


  }

  #input { 
    border: none; 
    padding: 0 1rem; 
    margin: 0.25rem; 

    flex-grow: 1; 
    height: 3rem;

    border-radius: 2rem; 

    background-color: #e9e9e9;
  }

  #input:focus { 
    outline: none; 
  }

  #form > button { 
    background: transparent; 
    border-radius: 3px; 
    border: none; 
    outline: none; 
    color: #fff; 

  }

/* messages */
  .log {
    text-align: end;
  }

  .log.in {
    color: green;
  }

  .log.out {
    color: red;
  }

  .message.sent {
    background-color: aquamarine !important;
  }

  .message.received {
    background-color: pink !important; 
  }

  .typing {
    position: absolute;
    bottom: 3rem;

    color: red;
  }
`