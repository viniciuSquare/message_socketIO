import styled from "styled-components";

export const AppContainer = styled.div`
  .container {
    display: grid;
    grid-template-columns: minmax(330px ,25%) 75%;
  }

  .chat, aside {
    height: calc(100vh - 3.8rem);
  }

  header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.201);

    height: 3.8rem;
    padding: 0.75rem 2rem;

  } 

/* User status indicator */
  h4.status {
    position: relative;

    color: rgba(89, 90, 91, 0.596);  
    font-weight: 200;
    
    margin-left: 0.3rem;
    padding-left: 0.5rem;
  }
  
  h4.status::before {
    position: absolute;
    width: 4px;
    height: 4px;
    
    content: "";

    border-radius: 2px;
    
    position: absolute;
    left: 0;
    top: 50%;  
    
    transform: translate(-50%, -50%);
  }

  h4.online::before {
    background: rgb(12, 220, 29);
  }

  h4.offline::before {
    background: rgb(211, 220, 212);
  }

`
