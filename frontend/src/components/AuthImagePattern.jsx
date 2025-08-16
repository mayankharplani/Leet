import {useState,useEffect} from 'react'
import {Braces,FileCode,Terminal,Code,BugIcon} from "lucide-react"

const AuthImagePattern = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  // Code snippets to display in the background
  const codeSnippets = [
    `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
    `function isValid(s) {
  const stack = [];
  const map = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  
  for (let i = 0; i < s.length; i++) {
    if (s[i] in map) {
      stack.push(s[i]);
    } else {
      const last = stack.pop();
      if (map[last] !== s[i]) return false;
    }
  }
  
  return stack.length === 0;
}`,
  ]

  // Rotate through code snippets
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % codeSnippets.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [codeSnippets.length])

  return (
    <div className="hidden lg:flex flex-col items-center justify-center p-12 relative overflow-hidden"
      style={{color: "var(--navy)"}}
    >
      {/* Animated code symbols in background */}
      

      <div className="z-10 max-w-md flex flex-col items-center"
      >
        {/* Code editor mockup */}
        <div className="w-full rounded-lg shadow-xl  mb-8 overflow-hidden opacity-80"
        style={{backgroundColor: "var(--navy)"}}>
          {/* Editor header */}
          <div className="bg-slate-700 px-4 py-2 flex items-center"
          style={{color: "var(--cream)"}}>
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs font-mono opacity-70">problem.js</div>
          </div>

          {/* Code content */}
          <div className="p-4 font-mono text-xs sm:text-sm overflow-hidden relative h-64">
            <pre className="whitespace-pre-wrap text-green-400 transition-opacity duration-1000">
              {codeSnippets[activeIndex]}
            </pre>

            {/* Blinking cursor */}
            <div className="absolute bottom-4 right-4 w-2 h-4 bg-white animate-blink"></div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default AuthImagePattern