import { ModalStyled } from './styled'

import { database } from '../../services/firabase'

import plusImg from '../../assets/buttons/plus.svg'
import { useChannel } from '../../hooks/useChannel'


export default function Modal({visibilityToggle}) {
  const { 
    socket,
    handleChannelSelection,
    leaveChannel  } = useChannel()

  // console.log(channels)
  async function handleNewChannel(e) {
    e.preventDefault();

    const formData = new FormData(e.target)
    
    let channelData = Object.fromEntries(formData.entries())
    console.log(channelData)
    
    const channelRef = await database.ref('channels');
    const firebaseRoom = await channelRef.push({
      name: channelData.name,
      authorId: socket.id,
      active: true,
      participants : 1,
      sockets : [
        socket.id
      ]
      
    })

    leaveChannel()
    handleChannelSelection(firebaseRoom.key);
    // console.log(firebaseRoom)
    // socket.emmit('channel-join')
    visibilityToggle();

  }

  return (
    <ModalStyled>
      <div className="content">
        <form onSubmit={ handleNewChannel } id="new-channel-form">
          <div id="modal-head"  >
            <h2>New channel</h2>
            <input name="name" type="text" placeholder="Channel name"/>
          </div>
        
          <div id="add-users">
            <h4>Add contacts to the channel</h4>
            {/* ONLINE USERS */}
            {/* {
              sockets?.map((socket, idx) => <h2 key={idx}>{socket}</h2>)
            } */}
          </div>
          <button  > 
              <img src={plusImg} alt="New group button"/>
          </button>

        </form>

      </div>

    </ModalStyled>
  )
}