import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Buyerpage from './components/Buyerpage/Buyerpage'
import Sellerpage from './components/Sellerpage/Sellerpage'
import Form from './components/Form/Form'
import Sellerform from './components/Form/Sellerform'

const App = () => {
  return (
    <div>
      <BrowserRouter>
            <Routes>
                  <Route path='/' element={<Home />}></Route>
                  <Route path='/login/:role' element={<Login />}></Route>
                  <Route path='/signup/:role' element={<Signup />}></Route>
                  <Route path='/form/:role' element={<Form />}></Route>
                  <Route path='/sellerform/:role' element={<Sellerform />}></Route>
                  <Route path='/buyerpage' element={<Buyerpage />}></Route>
                  <Route path='/sellerpage' element={<Sellerpage />}></Route>
              
                  
            </Routes>   
      </BrowserRouter>

    </div>
  )
}

export default App