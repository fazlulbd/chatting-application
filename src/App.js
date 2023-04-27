import React from 'react'
import Header from './component/Header';    
import Home from './component/Home';
import Registration from './component/Registration';
import Login from './component/Login';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";

const router = createBrowserRouter(
            createRoutesFromElements(
                <Route>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/registration" element={<Registration/>}/>
                  <Route path="login" element={<Login/>}/>
                </Route>
            )
          )
function App() {
  return (
    <>
      <Header></Header>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
