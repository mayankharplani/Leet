import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { User, Menu, X, LockIcon, Code } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { toast } from "react-toastify";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleDropdownKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleDropdown();
    }
  };

  const handleMobileMenuKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMobileMenu();
    }
  };

  return (
    <nav
      className="navbar fixed top-0 left-0 right-0 border-b z-50 border-gray-700 shadow-lg"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Brand */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-3 text-white hover:text-blue-400 "
              aria-label="Home"
            >
              {/* Brand Name */}
              <span className="text-3xl font-semibold tracking-wide">
                CodeVerse
              </span>
            </Link>
          </div>

          {/* Center - Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => {
                if (authUser) {
                  navigate("/problems");
                } else {
                  toast("Please Login First", {
                    position: "bottom-left",
                  });
                }
              }}
              className="text-gray-300 hover:text-white px-3 py-2 text-md rounded-md  font-medium transition-colors duration-200 hover:bg-gray-800 nav-item-hover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Problems
            </button>
            <button
              onClick={() => {
                if (authUser) {
                  navigate("/playlist");
                } else {
                  toast("Please Login First", {
                    position: "bottom-left",
                  });
                }
              }}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-md font-medium transition-colors duration-200 hover:bg-gray-800 nav-item-hover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Playlist
            </button>
            <button
              onClick={() => {
                if (authUser) {
                  navigate("/discuss");
                } else {
                  toast("Please Login First", {
                    position: "bottom-left",
                  });
                }
              }}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-md font-medium transition-colors duration-200 hover:bg-gray-800 nav-item-hover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Contest
            </button>
            <button
              onClick={() => {
                if (authUser) {
                  navigate("/leaderboard");
                } else {
                  toast("Please Login First", {
                    position: "bottom-left",
                  });
                }
              }}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-md font-medium transition-colors duration-200 hover:bg-gray-800 nav-item-hover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Leaderboard
            </button>
          </div>

          {/* Right side - User Profile and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* User Profile Dropdown - Hidden on mobile */}
            <div className="hidden md:block relative" ref={dropdownRef}>
              {authUser ? (
                <button
                  onClick={toggleDropdown}
                  onKeyDown={handleDropdownKeyDown}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none  focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full  duration-200 hover:bg-[#3E5879] p-2"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                  tabIndex={0}
                >
                  {/* User Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br  flex items-center justify-center text-gray-900 font-semibold text-sm">
                    <img
                      src={
                        authUser?.image ||
                        "https://avatar.iran.liara.run/public"
                      }
                      alt="User Avatar"
                      className="object-cover"
                    />
                  </div>

                  {/* User Name (hidden on small screens) */}
                  <span className="hidden sm:block text-sm font-medium">
                    {authUser?.name || "Guest"}
                  </span>

                  {/* Dropdown Arrow */}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate("/login")}
                    className="btn btn-primary"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="btn btn-primary"
                  >
                    Start for free
                  </button>
                </div>
              )}

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-0 z-50 border border-gray-200 dropdown-enter dropdown-enter-active"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-300 transition-colors duration-150"
                    onClick={() => setIsDropdownOpen(false)}
                    role="menuitem"
                    tabIndex={0}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-300 transition-colors duration-150"
                    onClick={() => setIsDropdownOpen(false)}
                    role="menuitem"
                    tabIndex={0}
                  >
                    Settings
                  </Link>
                  <Link
                    to="/add-problem"
                    className="flex gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-300 transition-colors duration-150"
                    onClick={() => setIsDropdownOpen(false)}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <Code className="w-5 h-5" />
                    Add Problem
                  </Link>
                  <hr className="border-gray-200" />
                  <LogoutButton onClick={() => setIsDropdownOpen(false)}>
                    <LockIcon className="size-3" />
                    {"Logout"}
                  </LogoutButton>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              onKeyDown={handleMobileMenuKeyDown}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md bg-[#213555] text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200 focus-ring"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
              tabIndex={0}
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Right to Left Slide */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed top-0 right-0 w-full h-screen bg-[#213555] border-l border-gray-700 shadow-xl transform transition-transform duration-300 ease-in-out z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="menu"
        aria-labelledby="mobile-menu-button"
      >
        {/* Mobile Menu Header with CodeVerse */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-semibold tracking-wide text-white">
              CodeVerse
            </span>
          </div>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            aria-label="Close mobile menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-4">
          {/* Mobile Navigation Links */}
          <div className="space-y-2">
            <button
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200 nav-item-hover"
              onClick={() => {
                if (authUser) {
                  navigate("/problems");
                  closeMobileMenu();
                } else {
                  toast("Please Login First", {
                    position: "bottom-left",
                    theme: "light",
                    hideProgressBar: true,
                  });
                }
              }}
              role="menuitem"
              tabIndex={0}
            >
              Problems
            </button>
            <button
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200 nav-item-hover"
              onClick={() => {
                if (authUser) {
                  navigate("/playlist");
                  closeMobileMenu();
                } else {
                  toast("Please Login First", {
                    position: "bottom-left",
                    theme: "light",
                    hideProgressBar: true,
                  });
                }
              }}
              role="menuitem"
              tabIndex={0}
            >
              Playlist
            </button>
            <button
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200 nav-item-hover"
              onClick={() => {
                if (authUser) {
                  navigate("/contest");
                  closeMobileMenu();
                } else {
                  toast("Please Login First", {
                    position: "bottom-left",
                    theme: "light",
                    hideProgressBar: true,
                  });
                }
              }}
              role="menuitem"
              tabIndex={0}
            >
              Contests
            </button>
            <button
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200 nav-item-hover"
              onClick={() => {
                if (authUser) {
                  navigate("/leaderboard");
                  closeMobileMenu();
                } else {
                  toast("Please Login First", {
                    position: "bottom-left",
                    theme: "light",
                    hideProgressBar: true,
                  });
                }
              }}
              role="menuitem"
              tabIndex={0}
            >
              Leaderboard
            </button>
          </div>

          {/* Mobile Profile Section */}
          <div className="pt-6 border-t border-gray-700">
            {authUser ? (
              <>
                <div className="flex items-center px-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-gray-900 font-semibold text-lg">
                      {authUser?.name ? (
                        authUser.name.charAt(0).toUpperCase()
                      ) : (
                        <User className="w-6 h-6" />
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-medium text-white">
                      {authUser?.name || "Guest"}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {authUser?.email || "guest@example.com"}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200 nav-item-hover"
                    onClick={closeMobileMenu}
                    role="menuitem"
                    tabIndex={0}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200 nav-item-hover"
                    onClick={closeMobileMenu}
                    role="menuitem"
                    tabIndex={0}
                  >
                    Settings
                  </Link>
                  <Link
                    to="/add-problem"
                    className="flex gap-2 px-3 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200 nav-item-hover"
                    onClick={closeMobileMenu}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <Code className="w-5 h-4" />
                    Add Problem
                  </Link>
                  <LogoutButton  onClick={() => setIsDropdownOpen(false)}>
                    <LockIcon className="size-3" />
                    {"Logout"}
                  </LogoutButton>
                </div>
              </>
            ) : (
              <div className="space-y-3 px-4">
                <button
                  onClick={() => {
                    navigate("/login");
                    closeMobileMenu();
                  }}
                  className="w-full btn btn-primary"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    closeMobileMenu();
                  }}
                  className="w-full btn btn-primary"
                >
                  Start for free
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Remove the overlay - no more black space */}
    </nav>
  );
};

export default Navbar;
