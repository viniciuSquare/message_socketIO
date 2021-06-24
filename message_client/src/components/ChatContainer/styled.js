import styled from "styled-components";

export const ChatConteiner = styled.div`
  position: relative;
  
  header {
    padding-top: 0.5rem;  

  }

  header h2 {
    color: #595a5b;  
    font-size: 1.3rem;
    font-weight: 400;
  }
  padding-top: 0.5rem;  
  
/* Messages */
  #messages {
    height: 80%;
    max-height: 60%;

    overflow-x: auto;

    background-color: #595a5b;

    max-width: 80%;
    margin: auto;
  }

  .chatAlert {
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;

    align-items: center;
  }

  #form { 
    display: flex; 
    padding: 0.25rem; 

    align-items: center;

    position: absolute; 

    bottom: 2.4rem; 
    left: 0; 
    right: 0; 

    height: 3rem;   
    margin: 0 auto;

    max-width: 90%;


  }

  #input { 
    border: none; 
    padding: 0 1rem; 
    flex-grow: 1; 
    border-radius: 2rem; 
    margin: 0.25rem; 

    height: 3rem;

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