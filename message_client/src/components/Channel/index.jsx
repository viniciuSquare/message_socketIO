export default function Channel({id, onClick, name, participants}) {  
  // console.log(props)
  
  const handleClick = () => {
    onClick(id)
  }

  return(
    <li className="user channel" onClick={handleClick}>
      <h3>{name}</h3>
      {/* <h4 className="status online">online</h4> */}
      <h4 className="status online">{participants}</h4>
    </li>
  )
}