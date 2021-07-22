import styled from "styled-components";

export const ModalStyled = styled.div`
  position: absolute;
  z-index: 100;
  top: 25%;

  height: 100%;
  width: 100vw;
  
  /* background-color: #464646a4; */

  .content {
    height: 30vh;
    width: 35vw;
    
    margin: auto;
    padding: 2.5rem ;

    border-radius: 8px;

    box-shadow: 0px 0px 30px 1px rgba(0,0,0,0.17);
    background-color: #f2f2f0;

    #new-channel-form {
      display: flex;
      flex-direction: column;

      height: 100%;

      #modal-head{
        flex: 8;
        
        input {
          width: 100%;
          margin-top: 1rem;
          height: 40px;
          padding: 0 0.8rem;

          font-size: 1.2rem;
          
          border: 1px solid #bfbfbf46;
          border-radius: 8px;

          background-color: #cdcdcd62;
          &::placeholder{
            color: #9f9f9f;
          }

        }
      }

      #add-users {
        flex: 3
      }

      button {
        width: 3rem;
        height: 3rem;
        line-height: 0;

        align-self: flex-end;

        background: transparent;
        border: 1px dotted #7c7c7d;
        border-radius: 50%;

        cursor: pointer;
        img {
          width: 20px;
        }
        &:hover{
          /* filter: brightness(0.7); */
          background-color: #edededd5;

        }
      }
    }

  }

`