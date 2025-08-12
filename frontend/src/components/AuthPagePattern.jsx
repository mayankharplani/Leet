import React from 'react'

const AuthPagePattern = () => {
  return (
    <div
          className="w-1/2 relative overflow-hidden hide-on-mobile "
          style={{
            background: "linear-gradient(135deg, #543310 20%, #ffffff 120%)",
          }}
        >
          <div className="absolute inset-0 p-8 flex flex-col justify-center">
            <div className="max-w-lg mx-auto">
              {/* Main Headline */}
              <h1
                className="text-4xl font-bold mb-4"
                style={{ color: "#F8F4E1" }}
              >
                Practice. Compete. Improve.
              </h1>
              <p className="text-xl mb-8" style={{ color: "#F8F4E1" }}>
                Join thousands of developers who are mastering algorithms and
                data structures.
              </p>

              {/* Code Snippet */}
              <div className="bg-white rounded-xl p-6 mb-8 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text)" }}
                  >
                    JavaScript
                  </span>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <pre
                  className="text-sm overflow-x-auto"
                  style={{ color: "var(--color-text)" }}
                >
                  {`function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      
      if (map.has(complement)) {
        return [map.get(complement), i];
      }
      
      map.set(nums[i], i);
    }
    
    return [];
  }`}
                </pre>
              </div>

              {/* Branding */}
              <div className="absolute bottom-8 right-8 text-right">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-2">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "var(--color-button)" }}
                  >
                    &lt;/&gt;
                  </span>
                </div>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-light)" }}
                >
                  by CodeVerse
                </p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default AuthPagePattern