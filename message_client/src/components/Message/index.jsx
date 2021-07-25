import { MessageContainer } from "./styled"

export default function Message({senderName, message}) {
  return(
    <MessageContainer className='message-item'>
        <div className="client-badge">
          <h3 className="name-letter">{senderName[0].toLowerCase()}</h3>
        </div>

        <div className="message">
          <h4>{senderName}</h4>
          <p>{message}</p>
        </div>
    </MessageContainer>
  )
}