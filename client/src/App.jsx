import React from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { logo } from "./assets"
import { Home, CreatePost } from "./pages"


const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full fixed flex justify-between items-center bg-black sm:px-8 px-4 py-4 border-b border-b-black">
        <Link to="/">
          <h2 className='text-white font-bold'>Gener8</h2>
        </Link>
        <Link to="/" className="font-inter font-medium text-white px-2 ml-auto">Images</Link>
        <Link to="/create" className="font-inter font-bold bg-accent text-black px-2 py-1 rounded-md">Create</Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-dark  min-h-[calc(100vh)]">
        <Routes>
          <Route path="/create" element={<CreatePost />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

//106e75