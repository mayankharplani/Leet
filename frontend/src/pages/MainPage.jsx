import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Code, Users, Trophy, BookOpen, ArrowRight, Play, Star, Zap, Cpu, Database, GitBranch, Layers } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore.js'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const MainPage = () => {

    const {authUser,isCheckingAuth} = useAuthStore();
    const navigate = useNavigate()

  return (
    <div className='min-h-screen relative overflow-hidden' style={{ backgroundColor: 'var(--cream)' }}>
      <Navbar />
      
      {/* Advanced Background Graphics */}
      <div className='fixed inset-0 pointer-events-none z-0'>
        {/* Subtle Grid Pattern */}
        <div className='absolute inset-0 opacity-3'>
          <div className='absolute inset-0' style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--steel) 1px, transparent 0)`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        
        {/* Floating Code Brackets - Clean and Elegant */}
        <div className='absolute top-20 left-16 text-5xl text-[var(--steel)] opacity-15 animate-float' style={{ animationDelay: '0s' }}>&lt;/&gt;</div>
        <div className='absolute top-40 right-24 text-4xl text-[var(--beige)] opacity-12 animate-float' style={{ animationDelay: '2s' }}>{'{}'}</div>
        <div className='absolute top-60 left-1/3 text-3xl text-[var(--navy)] opacity-10 animate-float' style={{ animationDelay: '4s' }}>[]</div>
        
        {/* Elegant Floating Orbs */}
        <div className='absolute top-32 left-20 w-3 h-3 bg-[var(--steel)] rounded-full opacity-20 animate-float'></div>
        <div className='absolute top-48 right-32 w-2 h-2 bg-[var(--beige)] rounded-full opacity-15 animate-float' style={{ animationDelay: '1.5s' }}></div>
        <div className='absolute top-72 left-1/4 w-2.5 h-2.5 bg-[var(--navy)] rounded-full opacity-18 animate-float' style={{ animationDelay: '3s' }}></div>
        
        {/* Subtle Data Streams */}
        <div className='absolute top-40 left-0 w-40 h-px bg-gradient-to-r from-transparent via-[var(--steel)] to-transparent opacity-20 animate-pulse'></div>
        <div className='absolute top-80 right-0 w-32 h-px bg-gradient-to-l from-transparent via-[var(--beige)] to-transparent opacity-15 animate-pulse' style={{ animationDelay: '2s' }}></div>
        
        {/* Minimal Circuit Lines */}
        <div className='absolute top-60 left-0 w-24 h-px bg-[var(--steel)] opacity-10'></div>
        <div className='absolute top-60 left-24 w-px h-16 bg-[var(--steel)] opacity-10'></div>
        <div className='absolute top-76 left-0 w-20 h-px bg-[var(--beige)] opacity-10'></div>
        
        {/* Elegant Floating Dots */}
        <div className='absolute top-24 right-16 w-1.5 h-1.5 bg-[var(--navy)] rounded-full opacity-25 animate-pulse'></div>
        <div className='absolute top-56 left-12 w-1 h-1 bg-[var(--steel)] rounded-full opacity-20 animate-pulse' style={{ animationDelay: '1s' }}></div>
        <div className='absolute top-88 right-8 w-1.5 h-1.5 bg-[var(--beige)] rounded-full opacity-18 animate-pulse' style={{ animationDelay: '2.5s' }}></div>
        
        {/* Subtle Hexagon */}
        <div className='absolute top-32 right-1/3 w-16 h-16 bg-gradient-to-br from-[var(--steel)] to-[var(--navy)] opacity-8 transform rotate-12 animate-float' style={{ animationDelay: '3.5s' }}></div>
        
        {/* Minimal Network Nodes */}
        <div className='absolute top-96 right-20 opacity-12'>
          <div className='relative'>
            <div className='w-2 h-2 bg-[var(--steel)] rounded-full animate-pulse'></div>
            <div className='absolute top-4 left-4 w-1.5 h-1.5 bg-[var(--beige)] rounded-full animate-pulse' style={{ animationDelay: '0.5s' }}></div>
            <div className='absolute top-8 left-0 w-1 h-1 bg-[var(--navy)] rounded-full animate-pulse' style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        
        {/* Elegant Code Flow */}
        <div className='absolute top-80 left-1/3 opacity-15'>
          <div className='relative'>
            <div className='w-2 h-2 bg-[var(--steel)] rounded-full animate-float'></div>
            <div className='absolute top-3 left-3 w-1.5 h-1.5 bg-[var(--beige)] rounded-full animate-float' style={{ animationDelay: '0.8s' }}></div>
            <div className='absolute top-6 left-6 w-1 h-1 bg-[var(--navy)] rounded-full animate-float' style={{ animationDelay: '1.6s' }}></div>
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className='pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-12 items-center mt-10'>
            {/* Left Content */}
            <div className='text-center lg:text-left space-y-6'>
              <div className='inline-flex items-center px-4 py-2 rounded-full bg-[var(--beige)] border border-[var(--steel)] text-[var(--navy)] text-sm font-medium shadow-lg hover:shadow-xl transition-shadow duration-300'>
                <Star className='w-4 h-4 mr-2' />
                #1 Coding Platform
              </div>
              
              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight relative z-10' style={{ color: 'var(--navy)' }}>
                {/* Background Effects */}
                <div className='absolute inset-0 -z-10'>
                  {/* Animated Gradient Background */}
                  <div className='absolute inset-0 bg-gradient-to-r from-[var(--beige)] via-[var(--steel)] to-[var(--beige)] opacity-20 rounded-3xl blur-3xl animate-pulse'></div>
                  
                  {/* Floating Tech Elements */}
                  <div className='absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-[var(--steel)] to-[var(--navy)] rounded-full opacity-30 animate-bounce'></div>
                  <div className='absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-[var(--beige)] to-[var(--steel)] rounded-full opacity-25 animate-bounce' style={{ animationDelay: '0.5s' }}></div>
                  <div className='absolute -bottom-6 left-1/4 w-8 h-8 bg-gradient-to-br from-[var(--navy)] to-[var(--beige)] rounded-full opacity-20 animate-bounce' style={{ animationDelay: '1s' }}></div>
                  
                  {/* Animated Lines */}
                  <div className='absolute top-1/2 -left-12 w-8 h-px bg-gradient-to-r from-[var(--steel)] to-transparent opacity-40 animate-pulse'></div>
                  <div className='absolute top-1/2 -right-12 w-8 h-px bg-gradient-to-l from-[var(--steel)] to-transparent opacity-40 animate-pulse' style={{ animationDelay: '1s' }}></div>
                  
                  {/* Glowing Dots */}
                  <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[var(--steel)] rounded-full opacity-60 animate-ping'></div>
                  <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[var(--steel)] rounded-full opacity-60 animate-ping' style={{ animationDelay: '0.5s' }}></div>
                </div>
                
                Master Coding with{' '}
                <span className='bg-gradient-to-r from-[var(--steel)] to-[var(--navy)] bg-clip-text text-transparent relative'>
                  {/* Enhanced CodeVerse Text Effects */}
                  <div className='absolute inset-0 -z-10'>
                    {/* Text Shadow Effect */}
                    <span className='absolute inset-0 bg-gradient-to-r from-[var(--steel)] to-[var(--navy)] blur-lg opacity-30'></span>
                    
                    {/* Animated Underline */}
                    <div className='absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[var(--steel)] via-[var(--beige)] to-[var(--navy)] rounded-full opacity-60 animate-pulse'></div>
                    
                    {/* Floating Code Symbols Around Text */}
                    <div className='absolute -top-4 -left-4 text-2xl text-[var(--steel)] opacity-40 animate-bounce'>&lt;</div>
                    <div className='absolute -top-4 -right-4 text-2xl text-[var(--steel)] opacity-40 animate-bounce'>&gt;</div>
                    <div className='absolute -bottom-4 left-1/4 text-xl text-[var(--beige)] opacity-30 animate-bounce'>{'{}'}</div>
                    <div className='absolute -bottom-4 right-1/4 text-xl text-[var(--beige)] opacity-30 animate-bounce'>[]</div>
                  </div>
                  
                  CodeVerse
                </span>
              </h1>
              
              <p className='text-lg sm:text-xl text-[var(--steel)] max-w-2xl mx-auto lg:mx-0'>
                Join thousands of developers solving real-world problems, participating in contests, and building their skills with our comprehensive coding platform.
              </p>
              
              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                { authUser ? (<button 
                onClick={() => navigate("/problems") }
                className='btn btn-primary px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl'>
                  <Play className='w-5 h-5 mr-2' />
                  Start Coding Now
                </button>) : (<button 
                onClick={() => navigate("/login")}
                className='btn btn-primary px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl'>
                  <Play className='w-5 h-5 mr-2' />
                  Start Coding Now
                </button>)

                }
                <button className='btn btn-secondary px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl'>
                  <BookOpen className='w-5 h-5 mr-2' />
                  Learn More
                </button>
              </div>
              
              {/* Enhanced Stats with 3D Effect */}
              <div className='grid grid-cols-3 gap-6 pt-8'>
                <div className='text-center group'>
                  <div className='relative'>
                    <div className='text-2xl font-bold text-[var(--navy)] group-hover:scale-110 transition-transform duration-200'>10K+</div>
                    <div className='absolute inset-0 bg-gradient-to-r from-[var(--steel)] to-[var(--navy)] blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-200'></div>
                  </div>
                  <div className='text-sm text-[var(--steel)]'>Active Users</div>
                </div>
                <div className='text-center group'>
                  <div className='relative'>
                    <div className='text-2xl font-bold text-[var(--navy)] group-hover:scale-110 transition-transform duration-200'>500+</div>
                    <div className='absolute inset-0 bg-gradient-to-r from-[var(--beige)] to-[var(--steel)] blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-200'></div>
                  </div>
                  <div className='text-sm text-[var(--steel)]'>Problems</div>
                </div>
                <div className='text-center group'>
                  <div className='relative'>
                    <div className='text-2xl font-bold text-[var(--navy)] group-hover:scale-110 transition-transform duration-200'>50+</div>
                    <div className='absolute inset-0 bg-gradient-to-r from-[var(--navy)] to-[var(--beige)] blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-200'></div>
                  </div>
                  <div className='text-sm text-[var(--steel)]'>Contests</div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Right Content - 3D Hero Animation */}
            <div className='relative'>
              {/* 3D Floating Platform */}
              <div className='relative z-10 bg-gradient-to-br from-[var(--beige)] to-[var(--steel)] rounded-3xl p-8 shadow-2xl transform hover:rotate-1 transition-transform duration-500'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-4'>
                    <div className='bg-[var(--cream)] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:-translate-y-1'>
                      <Code className='w-8 h-8 text-[var(--navy)] mx-auto' />
                      <div className='text-center text-sm font-medium text-[var(--navy)] mt-2'>Code Editor</div>
                    </div>
                    <div className='bg-[var(--cream)] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:-translate-y-1'>
                      <Users className='w-8 h-8 text-[var(--navy)] mx-auto' />
                      <div className='text-center text-sm font-medium text-[var(--navy)] mt-2'>Community</div>
                    </div>
                  </div>
                  <div className='space-y-4 pt-8'>
                    <div className='bg-[var(--cream)] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:-translate-y-1'>
                      <Trophy className='w-8 h-8 text-[var(--navy)] mx-auto' />
                      <div className='text-center text-sm font-medium text-[var(--navy)] mt-2'>Leaderboard</div>
                    </div>
                    <div className='bg-[var(--cream)] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:-translate-y-1'>
                      <BookOpen className='w-8 h-8 text-[var(--navy)] mx-auto' />
                      <div className='text-center text-sm font-medium text-[var(--navy)] mt-2'>Learning</div>
                    </div>
                  </div>
                </div>
                
                {/* 3D Floating Elements */}
                <div className='absolute -top-2 -right-2 w-6 h-6 bg-[var(--navy)] rounded-full opacity-60 animate-bounce'></div>
                <div className='absolute -bottom-2 -left-2 w-4 h-4 bg-[var(--steel)] rounded-full opacity-40 animate-pulse'></div>
              </div>
              
              {/* Enhanced Floating 3D Elements */}
              <div className='absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[var(--beige)] to-[var(--steel)] rounded-full opacity-40 animate-bounce shadow-2xl' style={{ animationDelay: '0.5s' }}></div>
              <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-[var(--steel)] to-[var(--navy)] rounded-full opacity-30 animate-pulse shadow-2xl' style={{ animationDelay: '1s' }}></div>
              
              {/* 3D Rotating Cube */}
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-20'>
                <div className='relative w-full h-full animate-spin' style={{ animationDuration: '15s' }}>
                  <div className='absolute inset-0 bg-gradient-to-br from-[var(--steel)] to-[var(--navy)] rounded-lg transform rotate-45'></div>
                  <div className='absolute inset-0 bg-gradient-to-br from-[var(--beige)] to-[var(--steel)] rounded-lg transform -rotate-45'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section with 3D Effects */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 relative z-10' style={{ backgroundColor: 'var(--beige)' }}>
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-5'>
          <div className='absolute inset-0' style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--navy) 1px, transparent 0)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        <div className='max-w-7xl mx-auto relative z-10'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold mb-4' style={{ color: 'var(--navy)' }}>
              Why Choose CodeVerse?
            </h2>
            <p className='text-lg text-[var(--steel)] max-w-2xl mx-auto'>
              Our platform provides everything you need to excel in competitive programming and software development.
            </p>
          </div>
          
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* Enhanced Feature Cards with 3D Effects */}
            {[
              { icon: Code, title: 'Advanced Code Editor', desc: 'Powerful Monaco editor with syntax highlighting, auto-completion, and real-time error detection.' },
              { icon: Trophy, title: 'Competitive Contests', desc: 'Regular coding contests with real-time rankings and instant feedback on your solutions.' },
              { icon: Users, title: 'Active Community', desc: 'Connect with fellow developers, share solutions, and learn from the best in the community.' },
              { icon: BookOpen, title: 'Learning Resources', desc: 'Comprehensive tutorials, problem explanations, and learning paths for all skill levels.' },
              { icon: Zap, title: 'Instant Feedback', desc: 'Get immediate results and detailed analysis of your code performance and efficiency.' },
              { icon: Star, title: 'Progress Tracking', desc: 'Monitor your learning journey with detailed analytics and personalized recommendations.' }
            ].map((feature, index) => (
              <div key={index} className='card p-8 rounded-2xl text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 group'>
                <div className='relative'>
                  <div className='w-16 h-16 bg-[var(--steel)] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg'>
                    <feature.icon className='w-8 h-8 text-[var(--cream)]' />
                  </div>
                  {/* 3D Glow Effect */}
                  <div className='absolute inset-0 bg-gradient-to-br from-[var(--steel)] to-[var(--navy)] rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10'></div>
                </div>
                <h3 className='text-xl font-bold mb-4' style={{ color: 'var(--navy)' }}>
                  {feature.title}
                </h3>
                <p className='text-[var(--steel)]'>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section with 3D Background */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* 3D Background Elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-[var(--beige)] to-[var(--steel)] rounded-full opacity-10 blur-3xl animate-pulse'></div>
          <div className='absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-[var(--steel)] to-[var(--navy)] rounded-full opacity-10 blur-3xl animate-pulse' style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className='max-w-4xl mx-auto text-center relative z-10'>
          <div className='card p-12 rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 transform hover:scale-105'>
            <h2 className='text-3xl sm:text-4xl font-bold mb-6' style={{ color: 'var(--navy)' }}>
              Ready to Start Your Coding Journey?
            </h2>
            <p className='text-lg text-[var(--steel)] mb-8 max-w-2xl mx-auto'>
              Join thousands of developers who are already improving their skills and competing on CodeVerse.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              {
                authUser ? (<button 
                  onClick={() => navigate("/problems")}
                className='btn btn-primary px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl'>
                Get Started Free
                <ArrowRight className='w-5 h-5 ml-2' />
              </button>) : (<button 
              onClick={() => navigate("/login")}
              className='btn btn-primary px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl'>
                Get Started Free
                <ArrowRight className='w-5 h-5 ml-2' />
              </button>)
              }
              
              <button 
              onClick={() => {
                if(authUser){
                  navigate("/problems")
                }
                else{
                  toast.error("Please Login First")
                }
              }}
              className='btn btn-secondary px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl'>
                View Problems
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* New 3D Tech Stack Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 relative z-10' style={{ backgroundColor: 'var(--cream)' }}>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold mb-4' style={{ color: 'var(--navy)' }}>
              Powered by Advanced Technology
            </h2>
            <p className='text-lg text-[var(--steel)] max-w-2xl mx-auto'>
              Built with cutting-edge tools and frameworks for the best developer experience.
            </p>
          </div>
          
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {[
              { icon: Cpu, name: 'Monaco Editor', desc: 'VS Code-like experience' },
              { icon: Database, name: 'Real-time', desc: 'Instant feedback' },
              { icon: GitBranch, name: 'Git Integration', desc: 'Version control' },
              { icon: Layers, name: 'Microservices', desc: 'Scalable architecture' }
            ].map((tech, index) => (
              <div key={index} className='text-center group'>
                <div className='relative mb-4'>
                  <div className='w-20 h-20 bg-gradient-to-br from-[var(--steel)] to-[var(--navy)] rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg'>
                    <tech.icon className='w-10 h-10 text-[var(--cream)]' />
                  </div>
                  {/* 3D Glow */}
                  <div className='absolute inset-0 bg-gradient-to-br from-[var(--steel)] to-[var(--navy)] rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10'></div>
                </div>
                <h3 className='text-lg font-bold mb-2' style={{ color: 'var(--navy)' }}>{tech.name}</h3>
                <p className='text-sm text-[var(--steel)]'>{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default MainPage