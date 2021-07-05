import Channel from "../Channel";
import Modal from '../Modal'

import { useChannel } from "../../hooks/useChannel";
import { useState } from "react";

import { AsideContainer } from "./styled";
import plusImg from '../../assets/buttons/plus.svg'

export default function Aside() {
  const { channels, handleChannelSelection} = useChannel();

  const [isModalVisible, setIsModalVisible] = useState(false)
  const toggleModalVisibility = () => setIsModalVisible(!isModalVisible);
  
  const handleClick = id => {
    handleChannelSelection(id)
  }

  let channelsList = channels?.state == 404 
    ? <div className="no-content-message">There is no channels to show</div> 
    : <div className="no-content-message">Server is off, try again later</div>;

  if (channels!=null) {
    console.log(channels)
    channelsList = channels?.map( channel => {
      if(channel.active) 
        return <Channel 
          key={channel.id}  
          id={channel.id} 
          participants={
            channel.sockets?.length || 0}
          name = {channel.name}
          onClick={handleClick} />
      else 
        return
    })
  }

  return (
    <AsideContainer className="usersStts">
      <div className="aside-block-head">
        <div className="collapsible">
          <h1>Chat</h1>
          <button onClick={toggleModalVisibility} >
            <img src={plusImg} alt="New group button"/>
          </button>
        </div>
        { isModalVisible &&
          <Modal visibilityToggle={toggleModalVisibility}/>
         }

      </div>
      <ul className="toCollapse userList">
        {channelsList}
      </ul>

      <ul className="toCollapse rooms">
        <button type="button" className="collapsible">Rooms</button>

        <li>  
          <h3 className="room channel">TI</h3>
          <p>last seem 5 min ago</p>
        </li>
        {/* {
          userList.map?.( (user, id) => {
            if (user != socket?.id){
              return (
                <li>
                  <h3 key={id}>{user}</h3>
                </li>
              )
            } else return
          })
        } */}
      </ul>
    </AsideContainer>
  )
}

  