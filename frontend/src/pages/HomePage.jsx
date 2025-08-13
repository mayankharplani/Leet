import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAuthStore } from '../store/useAuthStore.js'

const HomePage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const isLoggedIn = !!authUser;

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/main');
    } else {
      navigate('/signup');
    }
  };

  const handleContinueLearning = () => {
    if (isLoggedIn) {
      navigate('/main');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          {/* Left Side - Hero Text */}
          <div className="hero-text">
            <h1 className=''>
              Level Up Your <span className="highlight">Coding</span> Game with
            </h1>
            <span className="brand">CodeVerse</span>
            <p>
              Build strong coding skills through structured practice, real-world problem sets, 
              and performance tracking that ensures you stay consistent, 
              motivated, and ready for any coding challenge
            </p>
            
            <div className="cta-buttons">
              <button 
                className="btn-explore"
                onClick={handleGetStarted}
              >
                {isLoggedIn ? 'Go to Problems' : 'Get Started &gt;'}
              </button>
              <button 
                className="btn-primary"
                onClick={handleContinueLearning}
              >
                {isLoggedIn ? 'Continue Learning' : 'Sign In'}
              </button>
            </div>
          </div>

          {/* Right Side - Visual Cards */}
          <div className="space-y-4">
            {/* Top Row - 2 Cards */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="hero-visual-content flex-1">
                <div className="hero-visual-icon">
                  ⚡
                </div>
                <h3>Problem Patterns</h3>
                <p>Master 50+ algorithmic patterns with curated challenges</p>
              </div>
              
              <div className="hero-visual-content flex-1">
                <div className="hero-visual-icon">
                  🏢
                </div>
                <h3>Company Tags</h3>
                <p>Practice problems tagged by FAANG and top tech companies</p>
              </div>
            </div>
            
            {/* Bottom Row - 2 Cards */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="hero-visual-content flex-1">
                <div className="hero-visual-icon">
                  🤖
                </div>
                <h3>AI-Powered Help</h3>
                <p>Get instant guidance to unblock your coding challenges</p>
              </div>
              
              <div className="hero-visual-content flex-1">
                <div className="hero-visual-icon">
                  ⚙️
                </div>
                <h3>Smart Progress</h3>
                <p>Track your learning journey with intelligent analytics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="feature-section">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Your Complete Coding Success Toolkit
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12">
            A comprehensive platform designed for modern developers
          </p>
          
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                📚
              </div>
              <h3>Curated Playlists</h3>
              <p>Follow structured learning paths designed for different skill levels and interview types</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                💻
              </div>
              <h3>Custom Editor</h3>
              <p>Personalize your coding environment with themes, shortcuts, and debugging tools</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                📊
              </div>
              <h3>Progress Analytics</h3>
              <p>Visualize your improvement with detailed performance metrics and insights</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                🎯
              </div>
              <h3>Targeted Practice</h3>
              <p>Focus on specific topics or difficulty levels to maximize your learning efficiency</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                🔄
              </div>
              <h3>Spaced Repetition</h3>
              <p>Revisit problems at optimal intervals to reinforce your understanding</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                🌟
              </div>
              <h3>Community Support</h3>
              <p>Connect with fellow developers and share solutions in our active community</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 feature-section">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-[2.8rem] font-bold text-[#543310] mb-4">
            Ready to Transform Your Coding Skills?
          </h2>
          <p className="text-base sm:text-lg text-[#AF8F6F] mb-8">
            Start your journey with CodeVerse today and join thousands of developers 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-3">
              Get Started for Free
            </button>
            <button className="btn-explore text-lg px-8 py-3">
              View Problems
            </button>
          </div>
        </div>
      </section>

      {/* Feedback Widget */}
      <div className="feedback-widget">
        <p>We love feedback!</p>
        <p className="link">Tell us here</p>
      </div>
      <Footer/>
    </div>
  )
}

export default HomePage