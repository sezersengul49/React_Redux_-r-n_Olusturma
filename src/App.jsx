import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Product from './pages/Product'
import Header from './components/Header'


const App = () => {
  return (

     <div className=''>
      
      <Router>
      <Header/>
        <Routes>
          <Route index path='/' element={ <Product/>} />
        </Routes>
      </Router>

     </div>
  )
}

export default App