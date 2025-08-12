import React from 'react'
import { FaGithub, FaGoogle, FaLinkedin, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer
        style={{ backgroundColor: "var(--color-header)" }}
        className="py-12"
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info - Wider Column */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-black font-bold text-lg">
                    &lt;/&gt;
                  </span>
                </div>
                <span className="text-2xl font-bold text-white">CodeVerse</span>
              </div>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: "#F8EDE3" }}>
                Sharpen your coding skills with challenges. Join thousands of developers 
                mastering algorithms and data structures. Practice, compete, and improve 
                your problem-solving abilities with our comprehensive platform.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10  bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-all duration-200"
                >
                  <FaGithub size={20} color="#F8EDE3" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10  bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-all duration-200"
                >
                  <FaTwitter size={20} color="#F8EDE3" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10  bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-all duration-200"
                >
                  <FaLinkedin size={20} color="#F8EDE3" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors duration-200 block"
                    style={{ color: "#F8EDE3" }}
                  >
                    Problems
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors duration-200 block"
                    style={{ color: "#F8EDE3" }}
                  >
                    Playlists
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors duration-200 block"
                    style={{ color: "#F8EDE3" }}
                  >
                    Contests
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors duration-200 block"
                    style={{ color: "#F8EDE3" }}
                  >
                    Discuss
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors duration-200 block"
                    style={{ color: "#F8EDE3" }}
                  >
                    Progress
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors duration-200 block"
                    style={{ color: "#F8EDE3" }}
                  >
                    Leaderboard
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors duration-200 block"
                    style={{ color: "#F8EDE3" }}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors duration-200 block"
                    style={{ color: "#F8EDE3" }}
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors duration-200 block"
                    style={{ color: "#F8EDE3" }}
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors duration-200 block"
                    style={{ color: "#F8EDE3" }}
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors duration-200 block"
                    style={{ color: "#F8EDE3" }}
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors duration-200 block"
                    style={{ color: "#F8EDE3" }}
                  >
                    Partners
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-[#F8EDE3] border-opacity-30 pt-8 mb-8">
            <div className="text-center">
              <h3 className="text-white font-semibold text-lg mb-3">Stay Updated</h3>
              <p className="text-sm mb-4" style={{ color: "#F8EDE3" }}>
                Get the latest coding challenges and platform updates delivered to your inbox.
              </p>
              <div className="flex max-w-md mx-auto space-x-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-[#F8EDE3] border-opacity-30 bg-white bg-opacity-10 text-[#F8EDE3] placeholder-[#543310] focus:outline-none focus:border-[#F8EDE3] focus:border-opacity-50"
                />
                <button
                  className="px-6 py-2 rounded-lg font-medium transition-all duration-200"
                  style={{ 
                    backgroundColor: "#F8EDE3",
                    color: "var(--color-header)"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.opacity = "0.9";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.opacity = "1";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-[#F8EDE3] border-opacity-30 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p
              className="text-sm mb-4 md:mb-0"
              style={{ color: "#F8EDE3" }}
            >
              © 2025 CodeVerse. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <a
                href="#"
                className="text-sm hover:text-white transition-colors duration-200"
                style={{ color: "#F8EDE3" }}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm hover:text-white transition-colors duration-200"
                style={{ color: "#F8EDE3" }}
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm hover:text-white transition-colors duration-200"
                style={{ color: "#F8EDE3" }}
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer