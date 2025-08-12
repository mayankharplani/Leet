import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    console.log('Toggle mobile menu clicked, current state:', isMobileMenuOpen)
    setIsMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    console.log('Closing mobile menu')
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="header relative z-[9998]">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Hamburger */}
        <div className="flex items-center space-x-2">
          {/* Hamburger Menu Button - Mobile Only */}
          <button
            className={`md:hidden p-2 rounded-lg transition-all duration-200 relative z-[9999] ${
              isMobileMenuOpen 
                ? 'bg-[#AF8F6F] text-white' 
                : 'hover:bg-[#AF8F6F] text-white'
            }`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold">CodeVerse</span>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#problems" className="nav-link">Problems</a>
          <a href="#playlists" className="nav-link">Playlists</a>
          <a href="#resources" className="nav-link">Contests</a>
          <a href="#pricing" className="nav-link">Discuss</a>
          <a href="#feedback" className="nav-link">Feedback</a>
        </nav>
        
        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="btn-secondary">Login</button>
          <button className="btn-primary">Start for free</button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-[9999] bg-black bg-opacity-60" 
          onClick={closeMobileMenu}
          style={{ top: '0', left: '0', right: '0', bottom: '0' }}
        >
          <div 
            className="fixed top-0 left-0 w-64 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[10000]"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            style={{ 
              top: '0', 
              left: '0', 
              width: '16rem', 
              height: '100vh',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-300">
                  <span className="text-black font-bold text-lg">C</span>
                </div>
                <span className="text-xl font-bold">CodeVerse</span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close mobile menu"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="p-4 space-y-4">
              {["Problems", "Playlists", "Contests", "Discuss", "Feedback"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-3 px-4 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border-l-4 border-transparent hover:border-[#AF8F6F]"
                  onClick={closeMobileMenu}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Mobile CTA Buttons */}
            <div className="p-4 border-t border-gray-200 space-y-3">
              <button className="w-full py-3 px-4 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
                Login
              </button>
              <button 
                className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200"
                style={{
                  backgroundColor: "var(--color-button)",
                  boxShadow: "0 4px 14px rgba(116, 81, 45, 0.3)",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "var(--color-button-hover)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "var(--color-button)";
                }}
              >
                Start for free
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header