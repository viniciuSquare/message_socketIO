import { createContext, useEffect, useState } from "react";
import { useChannel } from "../hooks/useChannel";
import { auth, firebase } from '../services/firabase'

export const AuthContext = createContext({})

export function AuthContextProvider(props){
  const [user, setUser] = useState();
  const {socket} = useChannel()

  // when componet mount, it will listen if was auth already done
  useEffect(() => {
    //  event listener subscription secure end
    auth.onAuthStateChanged(user => {
      if(user) {
        const { displayName, photoURL, uid } = user;

        // socket.emit('user-auth', {displayName, photoURL, uid } )
        
        if( !displayName || !photoURL) {
          throw new Error('Missing information from Google Account')
        }
      
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
  }, [  ])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if(result.user) {
      const { displayName, photoURL, uid } = result.user;
      
      if( !displayName || !photoURL) {
        throw new Error('Missing information from Google Account')
      }  
    
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {props.children}
    </AuthContext.Provider>
  )
}