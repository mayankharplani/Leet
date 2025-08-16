import { useEffect, useState, useMemo } from "react";
import { useProblemStore } from "../store/useProblemStore.js";
import { Loader, Code, Filter, X } from "lucide-react";
import ProblemTable from "../components/ProblemTable.jsx";
import Navbar from "../components/Navbar.jsx";

const HomePage = () => {
  const {getAllProblems, problems, isProblemsLoading} = useProblemStore();
  
  // Filter states
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Any");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    getAllProblems()
  }, [getAllProblems]);

  // Get unique tags from problems
  const allTags = useMemo(() => {
    if(!Array.isArray(problems)) return [];
    const tagSet = new Set();
    problems.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [problems]);

  // Handle difficulty filter changes
  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulties(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  // Handle tag filter changes
  const handleTagChange = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedDifficulties([]);
    setSelectedStatus("Any");
    setSelectedTags([]);
  };

  // Check if any filters are active
  const hasActiveFilters = selectedDifficulties.length > 0 || selectedStatus !== "Any" || selectedTags.length > 0;

  if(isProblemsLoading){
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="text-center">
          <Loader className="size-16 animate-spin mx-auto mb-4" style={{ color: 'var(--steel)' }} />
          <p className="text-lg font-medium" style={{ color: 'var(--navy)' }}>Loading Problems...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen min-w-screen relative overflow-hidden" style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)'
    }}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle Soft Grid Pattern */}
        <div className="absolute inset-0 opacity-3" style={{
          backgroundImage: `
            linear-gradient(#475569 0.5px, transparent 0.5px),
            linear-gradient(90deg, #475569 0.5px, transparent 0.5px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
        
        {/* Soft Floating Circles */}
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full opacity-8" style={{
          background: 'radial-gradient(circle, #334155 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full opacity-6" style={{
          background: 'radial-gradient(circle, #475569 0%, transparent 70%)',
          animation: 'float 10s ease-in-out infinite 2s'
        }}></div>
        <div className="absolute bottom-40 left-1/4 w-28 h-28 rounded-full opacity-5" style={{
          background: 'radial-gradient(circle, #1e293b 0%, transparent 70%)',
          animation: 'float 9s ease-in-out infinite 1s'
        }}></div>
        
        {/* Soft Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-40 opacity-4" style={{
          background: 'radial-gradient(ellipse at center, #334155 0%, transparent 70%)',
          backgroundSize: '100% 100%'
        }}></div>
        
        {/* Gentle Animated Lines */}
        <div className="absolute top-1/3 left-0 w-full h-px opacity-6" style={{
          background: 'linear-gradient(90deg, transparent 0%, #475569 50%, transparent 100%)',
          animation: 'pulse 6s ease-in-out infinite'
        }}></div>
        <div className="absolute top-2/3 right-0 w-px h-40 opacity-4" style={{
          background: 'linear-gradient(180deg, transparent 0%, #334155 50%, transparent 100%)',
          animation: 'pulse 8s ease-in-out infinite 1s'
        }}></div>
        
        {/* Soft Geometric Shapes */}
        <div className="absolute top-1/4 right-1/4 w-20 h-20 opacity-4" style={{
          background: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          animation: 'spin 30s linear infinite'
        }}></div>
        
        {/* Additional Soft Elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-3" style={{
          background: 'radial-gradient(circle, #475569 0%, transparent 60%)',
          animation: 'pulse 12s ease-in-out infinite'
        }}></div>
        
        {/* Blue Accent Elements */}
        <div className="absolute top-1/6 right-1/6 w-16 h-16 rounded-full opacity-4" style={{
          background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
          animation: 'float 7s ease-in-out infinite 3s'
        }}></div>
        <div className="absolute bottom-1/6 left-1/6 w-20 h-20 rounded-full opacity-3" style={{
          background: 'radial-gradient(circle, #1d4ed8 0%, transparent 70%)',
          animation: 'float 9s ease-in-out infinite 2s'
        }}></div>
        
        {/* Subtle Blue Lines */}
        <div className="absolute top-1/4 left-0 w-px h-32 opacity-4" style={{
          background: 'linear-gradient(180deg, transparent 0%, #3b82f6 50%, transparent 100%)',
          animation: 'pulse 10s ease-in-out infinite 1s'
        }}></div>
        <div className="absolute bottom-1/4 right-0 w-px h-24 opacity-3" style={{
          background: 'linear-gradient(180deg, transparent 0%, #1d4ed8 50%, transparent 100%)',
          animation: 'pulse 8s ease-in-out infinite 2s'
        }}></div>
      </div>

      <Navbar/>
      
      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto mt-4">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg font-semibold hover:bg-white hover:bg-opacity-20 transition-all duration-300 mb-4 shadow-lg hover:shadow-xl transform hover:scale-105 border border-white border-opacity-20">
              <Code className="w-5 h-5" />
              All Problems
            </button>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto font-medium">
              Challenge yourself with our collection of coding problems.
            </p>
          </div>

          {/* Content Grid - Sidebar + Main */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-1 min-w-2xs">
              <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                    <Filter className="w-5 h-5" />
                    Filters
                  </h3>
                  {hasActiveFilters && (
                    <button 
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:scale-105"
                      onClick={clearAllFilters}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Difficulty Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-gray-300">Difficulty</h4>
                  <div className="space-y-2">
                    {['EASY', 'MEDIUM', 'HARD'].map((diff) => (
                      <label key={diff} className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-200">
                        <input 
                          type="checkbox" 
                          className="checkbox checkbox-sm" 
                          style={{ accentColor: '#3b82f6' }}
                          checked={selectedDifficulties.includes(diff)}
                          onChange={() => handleDifficultyChange(diff)}
                        />
                        <span className="text-sm text-gray-300">{diff}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-gray-300">Status</h4>
                  <div className="space-y-2">
                    {['SOLVED', 'UNSOLVED', 'Any'].map((status) => (
                      <label key={status} className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-200">
                        <input 
                          type="radio" 
                          name="status" 
                          className="radio radio-sm" 
                          style={{ accentColor: '#3b82f6' }}
                          checked={selectedStatus === status}
                          onChange={() => setSelectedStatus(status)}
                        />
                        <span className="text-sm text-gray-300">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tags Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-gray-300">Tags</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {allTags.slice(0, 8).map((tag) => (
                      <label key={tag} className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-200">
                        <input 
                          type="checkbox" 
                          className="checkbox checkbox-sm" 
                          style={{ accentColor: '#3b82f6' }}
                          checked={selectedTags.includes(tag)}
                          onChange={() => handleTagChange(tag)}
                        />
                        <span className="text-sm text-gray-300">{tag}</span>
                      </label>
                    ))}
                  </div>
                  {allTags.length > 8 && (
                    <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 mt-2 flex items-center gap-1 hover:scale-105">
                      Show More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Active Filters Summary */}
                {hasActiveFilters && (
                  <div className="pt-4 border-t border-gray-700">
                    <h4 className="font-medium mb-2 text-gray-300">Active Filters:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDifficulties.map(diff => (
                        <span key={diff} className="badge badge-sm hover:scale-105 transition-transform duration-200 bg-blue-900 text-blue-200 border-blue-700">
                          {diff}
                        </span>
                      ))}
                      {selectedStatus !== "Any" && (
                        <span key={selectedStatus} className="badge badge-sm hover:scale-105 transition-transform duration-200 bg-blue-900 text-blue-200 border-blue-700">
                          {selectedStatus}
                        </span>
                      )}
                      {selectedTags.map(tag => (
                        <span key={tag} className="badge badge-sm hover:scale-105 transition-transform duration-200 bg-blue-900 text-blue-200 border-blue-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {problems.length > 0 ? (
                <div className="bg-gray-900 bg-opacity-30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300">
                  <ProblemTable 
                    problems={problems}
                    selectedDifficulties={selectedDifficulties}
                    selectedStatus={selectedStatus}
                    selectedTags={selectedTags}
                  />
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Code className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    No Problems Found
                  </h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    It looks like there are no problems available at the moment. 
                    Check back later or contact an administrator to add new problems.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
