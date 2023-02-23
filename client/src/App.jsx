import React from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { logo } from "./assets"
import { Home, CreatePost } from "./pages"


const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-black sm:px-8 px-4 py-4 border-b border-b-black">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link to="/community" className="font-inter font-medium text-white px-4 py-2 ml-auto rounded-md">Images</Link>
        <Link to="/" className="font-inter font-medium bg-accent text-white px-4 py-2 rounded-md">Create</Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-dark min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<CreatePost />} />
          <Route path="/community" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

//106e75