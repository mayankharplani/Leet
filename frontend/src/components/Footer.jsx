import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Code, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram,
  Heart,
  ArrowUp
} from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative z-10" style={{ backgroundColor: 'var(--navy)' }}>
      {/* Main Footer Content */}
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--steel)] to-[var(--beige)] rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-[var(--cream)]" />
              </div>
              <span className="text-2xl font-bold text-[var(--cream)]">CodeVerse</span>
            </div>
            <p className="text-[var(--beige)] text-sm leading-relaxed mb-6">
              Empowering developers worldwide with cutting-edge coding challenges, 
              real-time competitions, and comprehensive learning resources. 
              Join our community and elevate your programming skills.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--steel)] hover:bg-[var(--steel-dark)] rounded-lg flex items-center justify-center transition-colors duration-200 group"
              >
                <Github className="w-5 h-5 text-[var(--cream)] group-hover:scale-110 transition-transform duration-200" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--steel)] hover:bg-[var(--steel-dark)] rounded-lg flex items-center justify-center transition-colors duration-200 group"
              >
                <Twitter className="w-5 h-5 text-[var(--cream)] group-hover:scale-110 transition-transform duration-200" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--steel)] hover:bg-[var(--steel-dark)] rounded-lg flex items-center justify-center transition-colors duration-200 group"
              >
                <Linkedin className="w-5 h-5 text-[var(--cream)] group-hover:scale-110 transition-transform duration-200" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--steel)] hover:bg-[var(--steel-dark)] rounded-lg flex items-center justify-center transition-colors duration-200 group"
              >
                <Instagram className="w-5 h-5 text-[var(--cream)] group-hover:scale-110 transition-transform duration-200" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-[var(--cream)] mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/problems" 
                  className="text-[var(--beige)] hover:text-[var(--cream)] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[var(--steel)] rounded-full mr-3 group-hover:bg-[var(--beige)] transition-colors duration-200"></span>
                  Coding Problems
                </Link>
              </li>
              <li>
                <Link 
                  to="/playlist" 
                  className="text-[var(--beige)] hover:text-[var(--cream)] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[var(--steel)] rounded-full mr-3 group-hover:bg-[var(--beige)] transition-colors duration-200"></span>
                  Learning Playlists
                </Link>
              </li>
              <li>
                <Link 
                  to="/contest" 
                  className="text-[var(--beige)] hover:text-[var(--cream)] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[var(--steel)] rounded-full mr-3 group-hover:bg-[var(--beige)] transition-colors duration-200"></span>
                  Coding Contests
                </Link>
              </li>
              <li>
                <Link 
                  to="/leaderboard" 
                  className="text-[var(--beige)] hover:text-[var(--cream)] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[var(--steel)] rounded-full mr-3 group-hover:bg-[var(--beige)] transition-colors duration-200"></span>
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/discuss" 
                  className="text-[var(--beige)] hover:text-[var(--cream)] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[var(--steel)] rounded-full mr-3 group-hover:bg-[var(--beige)] transition-colors duration-200"></span>
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-[var(--cream)] mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#tutorials" 
                  className="text-[var(--beige)] hover:text-[var(--cream)] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[var(--steel)] rounded-full mr-3 group-hover:bg-[var(--beige)] transition-colors duration-200"></span>
                  Tutorials
                </a>
              </li>
              <li>
                <a 
                  href="#documentation" 
                  className="text-[var(--beige)] hover:text-[var(--cream)] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[var(--steel)] rounded-full mr-3 group-hover:bg-[var(--beige)] transition-colors duration-200"></span>
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="#blog" 
                  className="text-[var(--beige)] hover:text-[var(--cream)] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[var(--steel)] rounded-full mr-3 group-hover:bg-[var(--beige)] transition-colors duration-200"></span>
                  Blog & Articles
                </a>
              </li>
              <li>
                <a 
                  href="#api" 
                  className="text-[var(--beige)] hover:text-[var(--cream)] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[var(--steel)] rounded-full mr-3 group-hover:bg-[var(--beige)] transition-colors duration-200"></span>
                  API Reference
                </a>
              </li>
              <li>
                <a 
                  href="#support" 
                  className="text-[var(--beige)] hover:text-[var(--cream)] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[var(--steel)] rounded-full mr-3 group-hover:bg-[var(--beige)] transition-colors duration-200"></span>
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-[var(--cream)] mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[var(--steel)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[var(--cream)] font-medium">Email</p>
                  <p className="text-[var(--beige)] text-sm">hello@codeverse.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[var(--steel)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[var(--cream)] font-medium">Phone</p>
                  <p className="text-[var(--beige)] text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[var(--steel)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[var(--cream)] font-medium">Address</p>
                  <p className="text-[var(--beige)] text-sm">123 Tech Street<br />Silicon Valley, CA 94025</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-8 border-t border-[var(--steel)]">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-[var(--cream)] mb-4">
              Stay Updated with CodeVerse
            </h3>
            <p className="text-[var(--beige)] mb-6">
              Get the latest updates on new problems, contests, and learning resources delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--steel)] text-[var(--cream)] placeholder-[var(--beige)] border border-[var(--steel)] focus:outline-none focus:border-[var(--beige)] transition-colors duration-200"
              />
              <button className="px-6 py-3 bg-[var(--beige)] text-[var(--navy)] font-semibold rounded-lg hover:bg-[var(--cream)] transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[var(--steel)] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-[var(--beige)] text-sm">
              <span>© 2024 CodeVerse. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Made with</span>
              <Heart className="w-4 h-4 text-red-400 inline" />
              <span className="hidden sm:inline">for developers</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-[var(--beige)] hover:text-[var(--cream)] transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-[var(--beige)] hover:text-[var(--cream)] transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-[var(--beige)] hover:text-[var(--cream)] transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[var(--steel)] hover:bg-[var(--steel-dark)] text-[var(--cream)] rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-200" />
      </button>
    </footer>
  )
}

export default Footer