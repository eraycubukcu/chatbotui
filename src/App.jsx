import { useState } from 'react'
import './App.css'
import ChatButton from './components/ChatButton'
import ChatPage from './components/ChatPage'
import { Routes,BrowserRouter as Router,Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ChatButton/>}></Route>
          <Route path="/chatbot" element={<ChatPage/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
