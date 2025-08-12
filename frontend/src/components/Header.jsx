import React from 'react'

const Header = () => {
  return (
      <header className="header">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold">CodeVerse</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#problems" className="nav-link">Problems</a>
            <a href="#playlists" className="nav-link">Playlists</a>
            <a href="#resources" className="nav-link">Contests</a>
            <a href="#pricing" className="nav-link">Discuss</a>
            <a href="#feedback" className="nav-link">Feedback</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="btn-secondary">Login</button>
            <button className="btn-primary">Start for free</button>
          </div>
        </div>
      </header>
  )
}

export default Header