import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Download,
  FileJson,
  Sparkles,
  Settings,
  Zap,
} from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { axiosInstance } from "../libs/axios.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const problemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testcases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      })
    )
    .min(1, "At least one test case is required"),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    CPP: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
  }),
  codeSnippets: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript code snippet is required"),
    PYTHON: z.string().min(1, "Python code snippet is required"),
    JAVA: z.string().min(1, "Java solution is required"),
    CPP: z.string().min(1, "C++ Solution is required"),
  }),
  referenceSolution: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript solution is required"),
    PYTHON: z.string().min(1, "Python solution is required"),
    JAVA: z.string().min(1, "Java solution is required"),
    CPP: z.string().min(1, "C++ solution is required"),
  }),
});

// Sample data remains the same...
const sampledpData = {
  title: "Climbing Stairs",
  category: "dp", // Dynamic Programming
  description:
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY",
  tags: ["Dynamic Programming", "Math", "Memoization"],
  constraints: "1 <= n <= 45",
  hints:
    "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
  editorial:
    "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
  testcases: [
    {
      input: "2",
      output: "2",
    },
    {
      input: "3",
      output: "3",
    },
    {
      input: "4",
      output: "5",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: "n = 2",
      output: "2",
      explanation:
        "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
    },
    PYTHON: {
      input: "n = 3",
      output: "3",
      explanation:
        "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    },
    JAVA: {
      input: "n = 4",
      output: "5",
      explanation:
        "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Write your code here
      pass

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Write your code here
      return 0;
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
  referenceSolution: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Base cases
if (n <= 2) {
  return n;
}

// Dynamic programming approach
let dp = new Array(n + 1);
dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

return dp[n];

/* Alternative approach with O(1) space
let a = 1; // ways to climb 1 step
let b = 2; // ways to climb 2 steps

for (let i = 3; i <= n; i++) {
  let temp = a + b;
  a = b;
  b = temp;
}

return n === 1 ? a : b;
*/
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Base cases
      if n <= 2:
          return n
      
      # Dynamic programming approach
      dp = [0] * (n + 1)
      dp[1] = 1
      dp[2] = 2
      
      for i in range(3, n + 1):
          dp[i] = dp[i - 1] + dp[i - 2]
      
      return dp[n]
      
      # Alternative approach with O(1) space
      # a, b = 1, 2
      # 
      # for i in range(3, n + 1):
      #     a, b = b, a + b
      # 
      # return a if n == 1 else b

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Base cases
      if (n <= 2) {
          return n;
      }
      
      // Dynamic programming approach
      int[] dp = new int[n + 1];
      dp[1] = 1;
      dp[2] = 2;
      
      for (int i = 3; i <= n; i++) {
          dp[i] = dp[i - 1] + dp[i - 2];
      }
      
      return dp[n];
      
      /* Alternative approach with O(1) space
      int a = 1; // ways to climb 1 step
      int b = 2; // ways to climb 2 steps
      
      for (int i = 3; i <= n; i++) {
          int temp = a + b;
          a = b;
          b = temp;
      }
      
      return n == 1 ? a : b;
      */
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
};

const sampleStringProblem = {
  title: "Valid Palindrome",
  description:
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
  difficulty: "EASY",
  tags: ["String", "Two Pointers"],
  constraints:
    "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
  hints:
    "Consider using two pointers, one from the start and one from the end, moving towards the center.",
  editorial:
    "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
  testcases: [
    {
      input: "A man, a plan, a canal: Panama",
      output: "true",
    },
    {
      input: "race a car",
      output: "false",
    },
    {
      input: " ",
      output: "true",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    PYTHON: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    JAVA: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Write your code here
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Write your code here
          pass
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
       
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
  referenceSolution: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Convert to lowercase and remove non-alphanumeric characters
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if it's a palindrome
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    
    return true;
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Convert to lowercase and keep only alphanumeric characters
          filtered_chars = [c.lower() for c in s if c.isalnum()]
          
          # Check if it's a palindrome
          return filtered_chars == filtered_chars[::-1]
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
        s = preprocess(s);
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
};

const CreateProblemForm = () => {
  const [sampleType, setSampleType] = useState("DP");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      testcases: [{ input: "", output: "" }],
      tags: [""],
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        JAVA: { input: "", output: "", explanation: "" },
        CPP: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {
        JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
        PYTHON: "def solution():\n    # Write your code here\n    pass",
        JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
        CPP: "#include <bits/stdc++.h> \nusing namespace std; \n \nint main() { \n    // Write your code here \n \n   return 0; \n}",
      },
      referenceSolution: {
        JAVASCRIPT: "// Add your reference solution here",
        PYTHON: "# Add your reference solution here",
        JAVA: "// Add your reference solution here",
        CPP: "//  Add your reference solution here",
      },
    },
  });
  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replacetestcases,
  } = useFieldArray({
    control,
    name: "testcases",
  });
  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const onSubmit = async (value) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/problem/create-problem", value);
      console.log(res.data);
      toast(res.data.message || "Problem Created successfully⚡", {
        position: "top-left",
      });
      navigation("/problems");
    } catch (error) {
      console.log(error);
      toast("Error creating problem", {
        position: "top-left",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    const sampleData = sampleType === "DP" ? sampledpData : sampleStringProblem;

    replaceTags(sampleData.tags.map((tag) => tag));
    replacetestcases(sampleData.testcases.map((tc) => tc));

    reset(sampleData);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        const safeData = {
          title: jsonData.title || "",
          description: jsonData.description || "",
          difficulty: jsonData.difficulty || "EASY",
          tags: jsonData.tags?.length ? jsonData.tags : [""],
          constraints: jsonData.constraints || "",
          hints: jsonData.hints || "",
          editorial: jsonData.editorial || "",
          testcases: jsonData.testcases?.length
            ? jsonData.testcases.map((tc) => ({
                input: tc.input || "",
                output: tc.output || "",
              }))
            : [{ input: "", output: "" }],
          examples: {
            JAVASCRIPT: {
              input: jsonData.examples?.JAVASCRIPT?.input || "",
              output: jsonData.examples?.JAVASCRIPT?.output || "",
              explanation: jsonData.examples?.JAVASCRIPT?.explanation || "",
            },
            PYTHON: {
              input: jsonData.examples?.PYTHON?.input || "",
              output: jsonData.examples?.PYTHON?.output || "",
              explanation: jsonData.examples?.PYTHON?.explanation || "",
            },
            JAVA: {
              input: jsonData.examples?.JAVA?.input || "",
              output: jsonData.examples?.JAVA?.output || "",
              explanation: jsonData.examples?.JAVA?.explanation || "",
            },
            CPP: {
              input: jsonData.examples?.CPP?.input || "",
              output: jsonData.examples?.CPP?.output || "",
              explanation: jsonData.examples?.CPP?.explanation || "",
            }
          },
          codeSnippets: {
            JAVASCRIPT: jsonData.codeSnippets?.JAVASCRIPT || "",
            PYTHON: jsonData.codeSnippets?.PYTHON || "",
            JAVA: jsonData.codeSnippets?.JAVA || "",
            CPP: jsonData.codeSnippets?.CPP || "",
          },
          referenceSolution: {
            JAVASCRIPT: jsonData.referenceSolution?.JAVASCRIPT || "",
            PYTHON: jsonData.referenceSolution?.PYTHON || "",
            JAVA: jsonData.referenceSolution?.JAVA || "",
            CPP: jsonData.referenceSolution?.CPP || "",
          },
        };
        console.log(safeData);
        reset(safeData);
        replaceTags(safeData.tags);
        replacetestcases(safeData.testcases);

        toast("Problem imported successfully!");
      } catch (err) {
        console.error(err);
        toast("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* Background Graphics */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--steel) 1px, transparent 0)`,
              backgroundSize: "80px 80px",
            }}
          ></div>
        </div>

        {/* Floating Code Elements */}
        <div className="absolute top-20 left-16 text-4xl text-[var(--steel)] opacity-15 animate-float hidden lg:block">
          &lt;/&gt;
        </div>
        <div
          className="absolute top-40 right-24 text-3xl text-[var(--beige)] opacity-12 animate-float hidden lg:block"
          style={{ animationDelay: "2s" }}
        >
          {"{}"}
        </div>
        <div
          className="absolute top-60 left-1/3 text-2xl text-[var(--navy)] opacity-10 animate-float hidden lg:block"
          style={{ animationDelay: "4s" }}
        >
          []
        </div>

        {/* Floating Dots */}
        <div className="absolute top-32 left-20 w-2 h-2 bg-[var(--steel)] rounded-full opacity-20 animate-float hidden lg:block"></div>
        <div
          className="absolute top-48 right-32 w-1.5 h-1.5 bg-[var(--beige)] rounded-full opacity-15 animate-float hidden lg:block"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-4 sm:pt-8 pb-8 sm:pb-16 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <button
              onClick={() => navigation("/problems")}
              className="
    absolute 
    top-3 left-[15%] transform -translate-x-1/2   /* mobile: center bottom */
    sm:left-6 sm:bottom-4 sm:translate-x-0        /* small screens: bottom-left */
    lg:top-8 lg:right-[82%]                       /* large screens: custom position */
    btn bg-[var(--navy)]
  "
            >
              Go to Problems
            </button>
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[var(--beige)] border border-[var(--steel)] text-[var(--navy)] text-xs sm:text-sm font-medium shadow-lg mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Create New Problem
            </div>
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
              style={{ color: "var(--navy)" }}
            >
              Design Your Challenge
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[var(--steel)] max-w-2xl mx-auto px-4">
              Create engaging coding problems that will challenge and inspire
              developers
            </p>
          </div>

          {/* Import Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-[var(--beige)] mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[var(--steel)] to-[var(--navy)] rounded-xl flex items-center justify-center">
                  <FileJson className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3
                    className="text-lg sm:text-xl font-bold"
                    style={{ color: "var(--navy)" }}
                  >
                    Quick Import
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--steel)]">
                    Upload a JSON file to auto-fill the form
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full lg:w-auto">
                <label className="cursor-pointer px-4 sm:px-6 py-2 sm:py-3 bg-[var(--steel)] text-white rounded-xl shadow-lg hover:bg-[var(--steel-dark)] transition-all duration-200 hover:scale-105 w-full sm:w-auto text-center">
                  <FileJson className="w-4 h-4 mr-2 inline" />
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    accept="application/json"
                    onChange={handleImport}
                  />
                </label>

                <div className="text-center w-full sm:w-auto">
                  <p className="text-xs sm:text-sm text-[var(--steel)] mb-2">
                    OR
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                        sampleType === "DP"
                          ? "bg-[var(--steel)] text-white"
                          : "bg-[var(--beige)] text-[var(--navy)] hover:bg-[var(--steel)] hover:text-white"
                      }`}
                      onClick={() => setSampleType("DP")}
                    >
                      DP Problem
                    </button>
                    <button
                      type="button"
                      className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                        sampleType === "string"
                          ? "bg-[var(--steel)] text-white"
                          : "bg-[var(--beige)] text-[var(--navy)] hover:bg-[var(--steel)] hover:text-white"
                      }`}
                      onClick={() => setSampleType("string")}
                    >
                      String Problem
                    </button>
                  </div>
                  <button
                    type="button"
                    className="mt-2 px-3 sm:px-4 py-2 bg-[var(--beige)] text-[var(--navy)] rounded-lg text-xs sm:text-sm font-medium hover:bg-[var(--steel)] hover:text-white transition-all duration-200 w-full sm:w-auto"
                    onClick={loadSampleData}
                  >
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 inline" />
                    Load Sample
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 sm:space-y-8"
          >
            {/* Basic Information */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-[var(--beige)]">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--steel)] to-[var(--navy)] rounded-xl flex items-center justify-center">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold"
                  style={{ color: "var(--navy)" }}
                >
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <div className="form-control">
                  <label className="label">
                    <span
                      className="label-text text-base sm:text-lg font-semibold"
                      style={{ color: "var(--navy)" }}
                    >
                      Problem Title
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full text-base sm:text-lg border-[var(--steel)] text-white bg-[var(--navy)] opacity-90 focus:ring-2 focus:ring-[var(--navy)] focus:ring-opacity-100"
                    {...register("title")}
                    placeholder="Enter a descriptive problem title"
                  />
                  {errors.title && (
                    <label className="label">
                      <span className="label-text-alt text-red-500">
                        {errors.title.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span
                      className="label-text text-base sm:text-lg font-semibold"
                      style={{ color: "var(--navy)" }}
                    >
                      Problem Description
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered min-h-24 sm:min-h-32 w-full text-base sm:text-lg border-[var(--steel)] text-white bg-[var(--navy)] opacity-90 focus:ring-2 focus:ring-[var(--navy)] focus:ring-opacity-20 resize-y"
                    {...register("description")}
                    placeholder="Describe the problem clearly with examples and context"
                  />
                  {errors.description && (
                    <label className="label">
                      <span className="label-text-alt text-red-500">
                        {errors.description.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span
                      className="label-text text-base sm:text-lg font-semibold"
                      style={{ color: "var(--navy)" }}
                    >
                      Difficulty Level
                    </span>
                  </label>
                  <select
                    className="select select-bordered w-full text-base sm:text-lg text-white bg-[var(--navy)] opacity-90 border-[var(--steel)] focus:border-[var(--navy)] focus:ring-2 focus:ring-[var(--navy)] focus:ring-opacity-20"
                    {...register("difficulty")}
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                  {errors.difficulty && (
                    <label className="label">
                      <span className="label-text-alt text-red-500">
                        {errors.difficulty.message}
                      </span>
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-[var(--beige)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--steel)] to-[var(--navy)] rounded-xl flex items-center justify-center">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-bold"
                    style={{ color: "var(--navy)" }}
                  >
                    Problem Tags
                  </h3>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-transform duration-200 w-full sm:w-auto"
                  onClick={() => appendTag("")}
                >
                  <Plus className="w-4 h-4" /> Add Tag
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {tagFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <input
                      type="text"
                      className="input input-bordered flex-1 border-[var(--steel)] text-white bg-[var(--navy)] opacity-90 focus:border-[var(--navy)] focus:ring-2 focus:ring-[var(--navy)] focus:ring-opacity-20 text-sm sm:text-base"
                      {...register(`tags.${index}`)}
                      placeholder="Enter tag (e.g., Array, DP, String)"
                    />
                    <button
                      type="button"
                      className="btn btn-ghost btn-square btn-sm hover:bg-red-50 hover:text-red-600 transition-colors duration-200 flex-shrink-0"
                      onClick={() => removeTag(index)}
                      disabled={tagFields.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              {errors.tags && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <span className="text-red-600 text-sm font-medium">
                    {errors.tags.message}
                  </span>
                </div>
              )}
            </div>

            {/* Test Cases */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-[var(--beige)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--steel)] to-[var(--navy)] rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-bold"
                    style={{ color: "var(--navy)" }}
                  >
                    Test Cases
                  </h3>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-transform duration-200 w-full sm:w-auto"
                  onClick={() => appendTestCase({ input: "", output: "" })}
                >
                  <Plus className="w-4 h-4" /> Add Test Case
                </button>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {testCaseFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="bg-[var(--cream)] rounded-xl p-4 sm:p-6 border border-[var(--beige)]"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                      <h4
                        className="text-base sm:text-lg font-semibold flex items-center gap-2"
                        style={{ color: "var(--navy)" }}
                      >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[var(--steel)] text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                          {index + 1}
                        </div>
                        Test Case #{index + 1}
                      </h4>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm text-red-600 hover:bg-red-50 transition-colors duration-200 w-full sm:w-auto"
                        onClick={() => removeTestCase(index)}
                        disabled={testCaseFields.length === 1}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
                      <div className="form-control">
                        <label className="label">
                          <span
                            className="label-text font-medium text-sm sm:text-base"
                            style={{ color: "var(--navy)" }}
                          >
                            Input
                          </span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered min-h-20 sm:min-h-24 text-white bg-[var(--navy)] opacity-90 w-full border-[var(--steel)] focus:border-[var(--navy)] focus:ring-2 focus:ring-[var(--navy)] focus:ring-opacity-20 resize-y text-sm sm:text-base"
                          {...register(`testcases.${index}.input`)}
                          placeholder="Enter test case input"
                        />
                        {errors.testcases?.[index]?.input && (
                          <label className="label">
                            <span className="label-text-alt text-red-500">
                              {errors.testcases[index].input.message}
                            </span>
                          </label>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span
                            className="label-text font-medium text-sm sm:text-base"
                            style={{ color: "var(--navy)" }}
                          >
                            Expected Output
                          </span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered min-h-20 sm:min-h-24 text-white bg-[var(--navy)] opacity-90 w-full border-[var(--steel)] focus:border-[var(--navy)] focus:ring-2 focus:ring-[var(--navy)] focus:ring-opacity-20 resize-y text-sm sm:text-base"
                          {...register(`testcases.${index}.output`)}
                          placeholder="Enter expected output"
                        />
                        {errors.testcases?.[index]?.output && (
                          <label className="label">
                            <span className="label-text-alt text-red-500">
                              {errors.testcases[index].output.message}
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.testcases && !Array.isArray(errors.testcases) && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <span className="text-red-600 text-sm font-medium">
                    {errors.testcases.message}
                  </span>
                </div>
              )}
            </div>

            {/* Code Editor Sections */}
            <div className="space-y-6 sm:space-y-8">
              {["JAVASCRIPT", "PYTHON", "JAVA", "CPP"].map((language) => (
                <div
                  key={language}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-[var(--beige)]"
                >
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--steel)] to-[var(--navy)] rounded-xl flex items-center justify-center">
                      <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <h3
                      className="text-xl sm:text-2xl font-bold"
                      style={{ color: "var(--navy)" }}
                    >
                      {language}
                    </h3>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    {/* Starter Code */}
                    <div className="bg-[var(--cream)] rounded-xl p-4 sm:p-6 border border-[var(--beige)]">
                      <h4
                        className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2"
                        style={{ color: "var(--navy)" }}
                      >
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--steel)]" />
                        Starter Code Template
                      </h4>
                      <div className="border border-[var(--steel)] rounded-lg overflow-hidden">
                        <Controller
                          name={`codeSnippets.${language}`}
                          control={control}
                          render={({ field }) => (
                            <Editor
                              height="250px"
                              language={language.toLowerCase()}
                              theme="oceanic-next"
                              value={field.value}
                              onChange={field.onChange}
                              options={{
                                minimap: { enabled: false },
                                fontSize: 12,
                                lineNumbers: "on",
                                roundedSelection: false,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                              }}
                            />
                          )}
                        />
                      </div>
                      {errors.codeSnippets?.[language] && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <span className="text-red-600 text-sm font-medium">
                            {errors.codeSnippets[language].message}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Reference Solution */}
                    <div className="bg-[var(--cream)] rounded-xl p-4 sm:p-6 border border-[var(--beige)]">
                      <h4
                        className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2"
                        style={{ color: "var(--navy)" }}
                      >
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        Reference Solution
                      </h4>
                      <div className="border border-[var(--steel)] rounded-lg overflow-hidden">
                        <Controller
                          name={`referenceSolution.${language}`}
                          control={control}
                          render={({ field }) => (
                            <Editor
                              height="250px"
                              language={language.toLowerCase()}
                              theme="vs-dark"
                              value={field.value}
                              onChange={field.onChange}
                              options={{
                                minimap: { enabled: false },
                                fontSize: 12,
                                lineNumbers: "on",
                                roundedSelection: false,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                              }}
                            />
                          )}
                        />
                      </div>
                      {errors.referenceSolution?.[language] && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <span className="text-red-600 text-sm font-medium">
                            {errors.referenceSolution[language].message}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Examples */}
                    <div className="bg-[var(--cream)] rounded-xl p-4 sm:p-6 border border-[var(--beige)]">
                      <h4
                        className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2"
                        style={{ color: "var(--navy)" }}
                      >
                        <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                        Example
                      </h4>
                      <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        <div className="form-control">
                          <label className="label">
                            <span
                              className="label-text font-medium text-sm sm:text-base"
                              style={{ color: "var(--navy)" }}
                            >
                              Input
                            </span>
                          </label>
                          <textarea
                            className="textarea textarea-bordered text-white bg-[var(--navy)] opacity-90 min-h-16 sm:min-h-20 w-full border-[var(--steel)] focus:border-[var(--navy)] focus:ring-2 focus:ring-[var(--navy)] focus:ring-opacity-20 resize-y text-sm sm:text-base"
                            {...register(`examples.${language}.input`)}
                            placeholder="Example input"
                          />
                          {errors.examples?.[language]?.input && (
                            <label className="label">
                              <span className="label-text-alt text-red-500">
                                {errors.examples[language].input.message}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span
                              className="label-text font-medium text-sm sm:text-base"
                              style={{ color: "var(--navy)" }}
                            >
                              Output
                            </span>
                          </label>
                          <textarea
                            className="textarea textarea-bordered min-h-16 sm:min-h-20 text-white bg-[var(--navy)] opacity-90 w-full border-[var(--steel)] focus:border-[var(--navy)] focus:ring-2 focus:ring-[var(--navy)] focus:ring-opacity-20 resize-y text-sm sm:text-base"
                            {...register(`examples.${language}.output`)}
                            placeholder="Example output"
                          />
                          {errors.examples?.[language]?.output && (
                            <label className="label">
                              <span className="label-text-alt text-red-500">
                                {errors.examples[language].output.message}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span
                              className="label-text font-medium text-sm sm:text-base"
                              style={{ color: "var(--navy)" }}
                            >
                              Explanation
                            </span>
                          </label>
                          <textarea
                            className="textarea textarea-bordered text-white bg-[var(--navy)] opacity-90 min-h-20 sm:min-h-24 w-full border-[var(--steel)] focus:border-[var(--navy)] focus:ring-2 focus:ring-[var(--navy)] focus:ring-opacity-20 resize-y text-sm sm:text-base"
                            {...register(`examples.${language}.explanation`)}
                            placeholder="Explain the example"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-[var(--beige)]">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--steel)] to-[var(--navy)] rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold"
                  style={{ color: "var(--navy)" }}
                >
                  Additional Information
                </h3>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span
                      className="label-text font-medium text-sm sm:text-base"
                      style={{ color: "var(--navy)" }}
                    >
                      Constraints
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered text-white bg-[var(--navy)] opacity-90 min-h-20 sm:min-h-24 w-full border-[var(--steel)] focus:border-[var(--navy)] focus:ring-2 focus:ring-[var(--navy)] focus:ring-opacity-20 resize-y text-sm sm:text-base"
                    {...register("constraints")}
                    placeholder="Enter problem constraints (e.g., 1 <= n <= 10^5)"
                  />
                  {errors.constraints && (
                    <label className="label">
                      <span className="label-text-alt text-red-500">
                        {errors.constraints.message}
                      </span>
                    </label>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span
                      className="label-text font-medium text-sm sm:text-base"
                      style={{ color: "var(--navy)" }}
                    >
                      Hints (Optional)
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered text-white bg-[var(--navy)] opacity-90 min-h-20 sm:min-h-24 w-full border-[var(--steel)] focus:border-[var(--navy)] focus:ring-2 focus:ring-[var(--navy)] focus:ring-opacity-20 resize-y text-sm sm:text-base"
                    {...register("hints")}
                    placeholder="Enter helpful hints for solving the problem"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span
                      className="label-text font-medium text-sm sm:text-base"
                      style={{ color: "var(--navy)" }}
                    >
                      Editorial (Optional)
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered text-white bg-[var(--navy)] opacity-90 min-h-24 sm:min-h-32 w-full border-[var(--steel)] focus:border-[var(--navy)] focus:ring-2 focus:ring-[var(--navy)] focus:ring-opacity-20 resize-y text-sm sm:text-base"
                    {...register("editorial")}
                    placeholder="Enter detailed solution explanation and approach"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-[var(--beige)]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                <div className="text-center sm:text-left">
                  <h3
                    className="text-lg sm:text-xl font-bold mb-2"
                    style={{ color: "var(--navy)" }}
                  >
                    Ready to Create?
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--steel)]">
                    Review your problem details and submit when ready
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg gap-3 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner text-white"></span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      Create Problem
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProblemForm;
