import React, {useContext, useEffect, useState} from 'react'
import {auth} from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  console.log(currentUser)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password) // return Promise
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password) // return Promise
  }

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)

    })
  }, [])


  const value = {
    currentUser,
    signup,
    login
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}


