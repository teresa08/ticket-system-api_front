// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Page/layout'
import { Ticket } from './Page/Ticket/ticket'
import Login from './Page/Login/login'
import { userResponse } from './Type/HttpResponseAxios'
import { Category } from './Page/Category/category'
import { Department } from './Page/Department/department'
import { User } from './Page/User/user'
import { ProtectedRoute } from './Middleware/ProtectedRouteProps'
import { createContext, ReactNode, useState } from 'react'
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path='ticket' element={<Ticket />} />
            <Route path='department' element={<Department />} />
            <Route path='category' element={<Category />} />
            <Route path='user' element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

interface UserContextType {
  userContext: userResponse;
  setUserContext: React.Dispatch<React.SetStateAction<userResponse>>;
}
export const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userContext, setUserContext] = useState<userResponse>({
    department: "",
    email: "",
    name: "",
    role: ""
  });
  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export default App
