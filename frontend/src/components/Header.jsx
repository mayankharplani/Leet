import React, { useState, useRef, useEffect } from "react";
import { Menu, X, Plus, User, Crown, LogOut, Settings, BookOpen, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);
  
  // Use the existing auth store
  const { authUser, logout, isCheckingAuth } = useAuthStore();
  const isLoggedIn = !!authUser;
  const isAdmin = authUser?.role === 'ADMIN';

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <header className="header relative z-[9998]">
        <div className="flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="animate-pulse flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg"></div>
            <span className="text-xl font-bold text-white">CodeVerse</span>
          </div>
        </div>
      </header>
    );
  }
  
  const toggleMobileMenu = () => {
    console.log("Toggle mobile menu clicked, current state:", isMobileMenuOpen);
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    console.log("Closing mobile menu");
    setIsMobileMenuOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileDropdownOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleProfileClick = () => {
    // Navigate to profile page
    console.log('Profile clicked');
    setIsProfileDropdownOpen(false);
    // navigate('/profile');
  };

  return (
    <header className="header relative z-[9998]">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and Hamburger */}
        <div className="flex items-center space-x-2">
          {/* Hamburger Menu Button - Mobile Only */}
          <button
            className={`md:hidden p-2 rounded-lg transition-all duration-200 relative z-[9999] ${
              isMobileMenuOpen
                ? "bg-[#AF8F6F] text-white"
                : "hover:bg-[#AF8F6F] text-white"
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
          <a href="#problems" className="nav-link">
            Problems
          </a>
          <a href="#playlists" className="nav-link">
            Playlists
          </a>
          <a href="#resources" className="nav-link">
            Contests
          </a>
          <a href="#pricing" className="nav-link">
            Discuss
          </a>
          <a href="#feedback" className="nav-link">
            Feedback
          </a>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <button
                className="btn-secondary"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  navigate("/signup");
                  closeMobileMenu();
                }}
              >
                Start for free
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/main")}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg font-semibold text-white transition-all duration-200 hover:bg-white hover:bg-opacity-10"
              >
                <BookOpen className="h-4 w-4" />
                <span>Go to Problems</span>
              </button>
              
              {isAdmin && (
                <button
                  onClick={() => navigate("/add-problem")}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg font-semibold text-white transition-all duration-200"
                  style={{
                    backgroundColor: "var(--color-button)",
                    boxShadow: "0 4px 14px rgba(116, 81, 45, 0.3)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "var(--color-button-hover)";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "var(--color-button)";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Problem</span>
                </button>
              )}
              
              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      <User className="h-4 w-4" />
                    </div>
                    {isAdmin && (
                      <div className="absolute -top-1 -right-1">
                        <Crown className="h-3 w-3 text-yellow-500 fill-current" />
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-white">
                    {authUser?.name || (isAdmin ? 'Admin' : 'User')}
                  </span>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-[10000]">
                    {/* Profile Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            <User className="h-5 w-5" />
                          </div>
                          {isAdmin && (
                            <div className="absolute -top-1 -right-1">
                              <Crown className="h-4 w-4 text-yellow-500 fill-current" />
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <p className="font-semibold" style={{ color: 'var(--color-text)' }}>
                            {authUser?.name || (isAdmin ? 'Admin User' : 'User')}
                          </p>
                          <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                            {authUser?.email || (isAdmin ? 'Full Access' : 'Standard Access')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dropdown Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        <User className="h-4 w-4 text-gray-500" />
                        <span style={{ color: 'var(--color-text)' }}>Profile</span>
                      </button>
                      
                      <button
                        onClick={() => navigate("/problems")}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        <BookOpen className="h-4 w-4 text-gray-500" />
                        <span style={{ color: 'var(--color-text)' }}>My Problems</span>
                      </button>
                      
                      <button
                        onClick={() => navigate("/achievements")}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        <Trophy className="h-4 w-4 text-gray-500" />
                        <span style={{ color: 'var(--color-text)' }}>Achievements</span>
                      </button>
                      
                      <button
                        onClick={() => navigate("/settings")}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="h-4 w-4 text-gray-500" />
                        <span style={{ color: 'var(--color-text)' }}>Settings</span>
                      </button>
                    </div>

                    {/* Logout Section */}
                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4 text-red-500" />
                        <span className="text-red-600 font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[9999] bg-black bg-opacity-60"
          onClick={closeMobileMenu}
          style={{ top: "0", left: "0", right: "0", bottom: "0" }}
        >
          <div
            className="fixed top-0 left-0 w-64 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[10000]"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            style={{
              top: "0",
              left: "0",
              width: "16rem",
              height: "100vh",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
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
              {["Problems", "Playlists", "Contests", "Discuss", "Feedback"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block py-3 px-4 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border-l-4 border-transparent hover:border-[#AF8F6F]"
                    onClick={closeMobileMenu}
                  >
                    {item}
                  </a>
                )
              )}
            </nav>

            {/* Mobile CTA Buttons */}
            <div className="p-4 border-t border-gray-200 space-y-3">
              {!isLoggedIn ? (
                <>
                  <button
                    className="w-full py-3 px-4 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => {
                      navigate("/login");
                      closeMobileMenu();
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200"
                    style={{
                      backgroundColor: "var(--color-button)",
                      boxShadow: "0 4px 14px rgba(116, 81, 45, 0.3)",
                    }}
                    onClick={() => {
                      navigate("/signup");
                      closeMobileMenu();
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
                </>
              ) : (
                <div className="space-y-3">
                  {/* {isAdmin && (
                    <button
                      onClick={() => {
                        navigate("/add-problem");
                        closeMobileMenu();
                      }}
                      className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200"
                      style={{
                        backgroundColor: "var(--color-button)",
                        boxShadow: "0 4px 14px rgba(116, 81, 45, 0.3)",
                      }}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Plus className="h-5 w-5" />
                        <span></span>
                      </div>
                    </button>
                  )} */}
                  
                  {/* Mobile Profile Section */}
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        navigate("/main");
                        closeMobileMenu();
                      }}
                      className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 bg-blue-600 hover:bg-blue-700"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <BookOpen className="h-5 w-5" />
                        <span>Go to Problems</span>
                      </div>
                    </button>
                    
                    {isAdmin && (
                      <button
                        onClick={() => {
                          navigate("/add-problem");
                          closeMobileMenu();
                        }}
                        className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200"
                        style={{
                          backgroundColor: "var(--color-button)",
                          boxShadow: "0 4px 14px rgba(116, 81, 45, 0.3)",
                        }}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Plus className="h-5 w-5" />
                          <span>Add Problem</span>
                        </div>
                      </button>
                    )}
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          <User className="h-5 w-5" />
                        </div>
                        {isAdmin && (
                          <div className="absolute -top-1 -right-1">
                            <Crown className="h-4 w-4 text-yellow-500 fill-current" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: 'var(--color-text)' }}>
                          {authUser?.name || (isAdmin ? 'Admin User' : 'User')}
                        </p>
                        <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                          {authUser?.email || (isAdmin ? 'Full Access' : 'Standard Access')}
                        </p>
                      </div>
                    </div>
                    
                    {/* Mobile Profile Menu Items */}
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          handleProfileClick();
                          closeMobileMenu();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <User className="h-4 w-4 text-gray-500" />
                        <span style={{ color: 'var(--color-text)' }}>Profile</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          navigate("/problems");
                          closeMobileMenu();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <BookOpen className="h-4 w-4 text-gray-500" />
                        <span style={{ color: 'var(--color-text)' }}>My Problems</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          navigate("/achievements");
                          closeMobileMenu();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Trophy className="h-4 w-4 text-gray-500" />
                        <span style={{ color: 'var(--color-text)' }}>Achievements</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          navigate("/settings");
                          closeMobileMenu();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Settings className="h-4 w-4 text-gray-500" />
                        <span style={{ color: 'var(--color-text)' }}>Settings</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          handleLogout();
                          closeMobileMenu();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="h-4 w-4 text-red-500" />
                        <span className="text-red-600 font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
