import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from './Comps/Nav';
import { BrowserRouter } from 'react-router-dom';
import Myrouter from './Myrouter';
import React from 'react';
import { useState,createContext } from "react";
import Footer from './Comps/Footer';


export const UserContext = createContext();
function App() {

  
  const [conuser,setUser]=useState(null);

  return (
    <div className="App">
      <UserContext.Provider value={{conuser,setUser}}>
      <BrowserRouter>
        <MyNav />
        
        <Myrouter />
        <Footer></Footer>

      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
