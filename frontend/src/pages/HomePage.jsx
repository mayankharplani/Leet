import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header/>

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
              <button className="btn-explore">
                Get Started &gt;
              </button>
              <button className="btn-primary">
                Continue Learning
              </button>
            </div>
          </div>

          {/* Right Side - Visual Cards */}
          <div className="space-y-4">
            {/* Top Row - 2 Cards */}
            <div className="flex gap-4">
              <div className="hero-visual-content flex-1">
                <div className="hero-visual-icon">
                  🎯
                </div>
                <h3 className='text-[1.2rem]'>Crack Any DSA Pattern</h3>
                <p className='text-[0.85rem]'>Master proven problem-solving patterns used by top coders</p>
              </div>
              
              <div className="hero-visual-content flex-1">
                <div className="hero-visual-icon">
                  🏢
                </div>
                <h3 className='text-[1.2rem]'>Company Tags</h3>
                <p className='text-[0.85rem]'>Practice problems tagged by FAANG and top tech companies</p>
              </div>
            </div>
            
            {/* Bottom Row - 2 Cards */}
            <div className="flex gap-4">
              <div className="hero-visual-content flex-1">
                <div className="hero-visual-icon">
                  ⏳
                </div>
                <h3 className='text-[1.2rem]'>Real Contest Experience</h3>
                <p className='text-[0.85rem]'>Train in a timed environment with real problems so you’re ready for the pressure of actual coding competitions.</p>
              </div>
              
              <div className="hero-visual-content flex-1">
                <div className="hero-visual-icon">
                  ⚙️
                </div>
                <h3 className='text-[1.2rem]'>Smart Progress</h3>
                <p className='text-[0.85rem]'>Stay consistent with a personalized dashboard that shows your solved problems, learning streaks, and skill growth over time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="feature-section">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Complete Coding Success Toolkit
          </h2>
          <p className="text-xl text-gray-600 mb-12">
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
      <section className="py-16 feature-section">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-[2.8rem] font-bold text-[#543310] mb-4">
            Ready to Transform Your Coding Skills?
          </h2>
          <p className="text-lg text-[#AF8F6F] mb-8">
            Start your journey with CodeVerse today and join thousands of developers 
           
          </p>
          <div className="flex gap-4 justify-center">
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