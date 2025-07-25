import React, { createContext, useState } from 'react'
// User Conetxt:
export const userContext = createContext();

const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <userContext.Provider value={{user, setUser}}>
      {children}
    </userContext.Provider>
  )
}

export default UserContextProvider;