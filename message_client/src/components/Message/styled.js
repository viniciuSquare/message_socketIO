import styled from 'styled-components'

export const MessageContainer = styled.div`
  display: flex;

  /* background-color: aliceblue; */
  padding: 0.8rem 0 ;

  .client-badge {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;

    text-align: center;

    font-size: 1rem;
    
    background: #c7a8a8;
    
    margin-left: 1.25rem;
    margin-right: 0.7rem;
    
    h3.name-letter{
      font-weight: 300;
    }

  }

  .message {
    h4 {
      font-weight: 500;

      font-size: .8rem;
      color: #333;
    }
    p {
      padding-top: 0.4rem ;
    }

  }


`