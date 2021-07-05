import ChatIcon from '../../assets/logo_chat.png'
import { useAuth } from '../../hooks/useAuth'

import { HeaderStyled } from './styled'

export default function Header() {
  const { user, signInWithGoogle } = useAuth()

  async function signIn() {
  //   await signInWithGoogle()
  }
  
  return (
    <HeaderStyled>
      <img src={ChatIcon} alt="logo_chat"/>
      <div className="currentUserIcon">
        { user ? (
          // <img src={user.avatar} alt="" />
          console.log(user)
          ) : <button onClick={signIn}>Login</button>
        }
      </div>
    </HeaderStyled>
  )
}