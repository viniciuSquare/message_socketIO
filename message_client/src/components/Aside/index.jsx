import Channel from "components/Channel";
import { AsideContainer } from "./styled";

export default function Aside({channels, onSelectChannel}) {
  // const [onSelectedChannel, channels] = [()=> console.log("hi"), {id:1, participants:4, name: "room"}]
  const handleClick = id => {
    onSelectChannel(id)
    // console.log(id)
  }

  let channelsList = <div className="no-content-message">There is no channels to show</div>;
  let userList = [];

  if (channels!=null) {
    channelsList = channels?.map( channel => {
      // console.log(channel)
      return <Channel 
        key={channel.id}  
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
        {/* <li className="user">
          <h3>Vinicius</h3>
          <h4 className="status online">online</h4>
        </li>
        <li className="user">
          <h3>Gabi</h3>
          <h4 className="status offline">offline</h4>
        </li>
        <li className="user">
          <h3>Vanessa</h3>
          <h4 className="status online">online</h4>
        </li> */}
      </ul>

      <ul className="toCollapse rooms">
        <button type="button" className="collapsible">Rooms</button>

        <li>  
          <h3>TI</h3>
          <p>last seem 5 min ago</p>
        </li>
        {
          userList.map?.( (user, id) => {
            return (
              <li>
                <h3 key={id}>{user}</h3>
              </li>
            )
          })
        }
      </ul>
    </AsideContainer>
  )
}

  