import { AsideContainer } from "./styled";

export default function Aside() {
  return (
    <AsideContainer className="usersStts">
      <button type="button" className="collapsible">Chat</button>
      <ul className="toCollapse userList">
        <li className="user">
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
        </li>
      </ul>

      <ul className="toCollapse rooms">
        <button type="button" className="collapsible">Rooms</button>

        <li>  
          <h3>TI</h3>
          <p>last seem 5 min ago</p>
        </li>
      </ul>
    </AsideContainer>
  )
}