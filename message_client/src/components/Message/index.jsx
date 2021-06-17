import { MessageContainer } from "./styled"

export default function Message({senderName, message}) {
  return(
    <MessageContainer className='message-item'>
        <div className="client-badge">
          <h3>{senderName[0]}</h3>
        </div>
        <div className="message">
          <h3>{senderName}</h3>
          <p>{message}</p>
        </div>
    </MessageContainer>
  )
}