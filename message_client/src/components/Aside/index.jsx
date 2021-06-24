import Channel from "components/Channel";
import { useChannel } from "hooks/useChannel";
import { AsideContainer } from "./styled";

export default function Aside() {
  const {socket, channels, handleChannelSelection} = useChannel();
  
  const handleClick = id => {
    handleChannelSelection(id)
  }

  let channelsList = channels?.state == 404 
    ? <div className="no-content-message">There is no channels to show</div> 
    : <div className="no-content-message">Server is off, try again later</div>;
  let userList = [];

  if (channels!=null) {
    console.log(channels)
    channelsList = channels?.map( channel => {
      return <Channel 
        key={channel.channel_id}  
        id={channel.id} 
        participants={channel.participants}
        name = {channel.name}
        onClick={handleClick} />
    })
    
    channels?.forEach( (channel, idx) => {
      let { sockets } = channel;

      userList.push(...sockets)
    } )
  }
  return (
    <AsideContainer className="usersStts">
      <button type="button" className="collapsible">Chat</button>
      <ul className="toCollapse userList">
        {channelsList}
      </ul>

      <ul className="toCollapse rooms">
        <button type="button" className="collapsible">Rooms</button>

        <li>  
          <h3>TI</h3>
          <p>last seem 5 min ago</p>
        </li>
        {
          userList.map?.( (user, id) => {
            if (user != socket?.id){
              return (
                <li>
                  <h3 key={id}>{user}</h3>
                </li>
              )
            } else return
          })
        }
      </ul>
    </AsideContainer>
  )
}

  