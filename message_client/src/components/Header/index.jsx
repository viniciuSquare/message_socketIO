import ChatIcon from 'assets/logo_chat.png'

export default function Header() {
  return (
    <header>
      <img src={ChatIcon} alt="logo_chat"/>
      <div className="currentUserIcon"></div>
    </header>
  )
}