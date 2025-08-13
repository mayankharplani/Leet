import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  User,
  Crown,
  Star,
  Clock,
  TrendingUp,
  CheckCircle,
  Circle,
  RefreshCw,
  BookOpen,
  Trophy,
  Target,
  Zap,
} from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

const MainPage = () => {
  // Use the existing auth store
  const { authUser } = useAuthStore();
  const isLoggedIn = !!authUser;
  const isAdmin = authUser?.role === "ADMIN";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);

  // Mock problems data - replace with actual API call
  //   useEffect(() => {
  //     const mockProblems = [
  //       {
  //         id: 1,
  //         title: "Palindrome Number",
  //         difficulty: "easy",
  //         category: "Math",
  //         acceptance: 94.3,
  //         submissions: 1250000,
  //         status: "solved", // solved, attempted, unsolved
  //         isBookmarked: false,
  //         tags: ["Math"],
  //       },
  //       {
  //         id: 2,
  //         title: "Two Sum",
  //         difficulty: "easy",
  //         category: "Array",
  //         acceptance: 71.4,
  //         submissions: 890000,
  //         status: "solved",
  //         isBookmarked: true,
  //         tags: ["Array", "Hash Table"],
  //       },
  //       {
  //         id: 3,
  //         title: "Longest Substring Without Repeating Characters",
  //         difficulty: "medium",
  //         category: "String",
  //         acceptance: 68.5,
  //         submissions: 750000,
  //         status: "attempted",
  //         isBookmarked: false,
  //         tags: ["String", "Hash Table", "Sliding Window"],
  //       },
  //       {
  //         id: 4,
  //         title: "Median of Two Sorted Arrays",
  //         difficulty: "hard",
  //         category: "Array",
  //         acceptance: 45.2,
  //         submissions: 450000,
  //         status: "attempted",
  //         isBookmarked: true,
  //         tags: ["Array", "Binary Search", "Divide and Conquer"],
  //       },
  //       {
  //         id: 5,
  //         title: "Valid Parentheses",
  //         difficulty: "easy",
  //         category: "Stack",
  //         acceptance: 78.9,
  //         submissions: 1100000,
  //         status: "solved",
  //         isBookmarked: false,
  //         tags: ["Stack", "String"],
  //       },
  //       {
  //         id: 6,
  //         title: "3Sum",
  //         difficulty: "medium",
  //         category: "Array",
  //         acceptance: 52.3,
  //         submissions: 380000,
  //         status: "solved",
  //         isBookmarked: false,
  //         tags: ["Array", "Two Pointers", "Sorting"],
  //       },
  //       {
  //         id: 7,
  //         title: "Longest Common Prefix",
  //         difficulty: "easy",
  //         category: "String",
  //         acceptance: 82.1,
  //         submissions: 650000,
  //         status: "solved",
  //         isBookmarked: false,
  //         tags: ["String", "Two Pointers"],
  //       },
  //       {
  //         id: 8,
  //         title: "Reverse Integer",
  //         difficulty: "medium",
  //         category: "Math",
  //         acceptance: 58.7,
  //         submissions: 520000,
  //         status: "solved",
  //         isBookmarked: false,
  //         tags: ["Math"],
  //       },
  //       {
  //         id: 9,
  //         title: "4Sum",
  //         difficulty: "medium",
  //         category: "Array",
  //         acceptance: 48.9,
  //         submissions: 320000,
  //         status: "solved",
  //         isBookmarked: false,
  //         tags: ["Array", "Two Pointers", "Sorting"],
  //       },
  //       {
  //         id: 10,
  //         title: "Find Peak Element",
  //         difficulty: "medium",
  //         category: "Array",
  //         acceptance: 62.4,
  //         submissions: 410000,
  //         status: "solved",
  //         isBookmarked: false,
  //         tags: ["Array", "Binary Search"],
  //       },
  //       {
  //         id: 11,
  //         title: "Kids With the Greatest Number of Candies",
  //         difficulty: "easy",
  //         category: "Array",
  //         acceptance: 88.2,
  //         submissions: 780000,
  //         status: "solved",
  //         isBookmarked: false,
  //         tags: ["Array", "Greedy"],
  //       },
  //     ];
  //     setProblems(mockProblems);
  //     setFilteredProblems(mockProblems);
  //   }, []);

  // Filter problems based on search, filters, and active tab
  //   useEffect(() => {
  //     let filtered = problems.filter((problem) => {
  //       const matchesSearch =
  //         problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         problem.tags.some((tag) =>
  //           tag.toLowerCase().includes(searchQuery.toLowerCase())
  //         );
  //       const matchesDifficulty =
  //         selectedDifficulty === "all" ||
  //         problem.difficulty === selectedDifficulty;
  //       const matchesCategory =
  //         selectedCategory === "all" || problem.category === selectedCategory;

  //       // Filter by active tab
  //       let matchesTab = true;
  //       if (activeTab === "top10") {
  //         filtered = problems.slice(0, 10);
  //         return matchesSearch && matchesDifficulty && matchesCategory;
  //       } else if (activeTab === "top25") {
  //         filtered = problems.slice(0, 25);
  //         return matchesSearch && matchesDifficulty && matchesCategory;
  //       }

  //       return matchesSearch && matchesDifficulty && matchesCategory;
  //     });
  //     setFilteredProblems(filtered);
  //   }, [searchQuery, selectedDifficulty, selectedCategory, activeTab, problems]);

  //   const getDifficultyColor = (difficulty) => {
  //     switch (difficulty) {
  //       case "easy":
  //         return "text-green-400";
  //       case "medium":
  //         return "text-orange-400";
  //       case "hard":
  //         return "text-red-400";
  //       default:
  //         return "text-gray-400";
  //     }
  //   };

  //   const getDifficultyText = (difficulty) => {
  //     return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  //   };

  //   const getStatusIcon = (status) => {
  //     switch (status) {
  //       case "solved":
  //         return <CheckCircle className="h-5 w-5 text-green-400" />;
  //       case "attempted":
  //         return <Circle className="h-5 w-5 text-yellow-400" />;
  //       default:
  //         return <Circle className="h-5 w-5 text-gray-400" />;
  //     }
  //   };

  //   const getStatusText = (status) => {
  //     switch (status) {
  //       case "solved":
  //         return "Solved";
  //       case "attempted":
  //         return "Attempted";
  //       default:
  //         return "Unsolved";
  //     }
  //   };

  //   const handleAddProblem = () => {
  //     console.log("Add problem clicked");
  //   };

  //   const handlePickAny = () => {
  //     // Randomly select a problem
  //     const randomIndex = Math.floor(Math.random() * problems.length);
  //     const randomProblem = problems[randomIndex];
  //     console.log("Random problem selected:", randomProblem.title);
  //     // Navigate to problem or show modal
  //   };

  //   const toggleBookmark = (problemId) => {
  //     setProblems((prev) =>
  //       prev.map((problem) =>
  //         problem.id === problemId
  //           ? { ...problem, isBookmarked: !problem.isBookmarked }
  //           : problem
  //       )
  //     );
  //   };

  // Calculate stats
//   const totalProblems = problems.length;
//   const solvedProblems = problems.filter((p) => p.status === "solved").length;
//   const attemptedProblems = problems.filter(
//     (p) => p.status === "attempted"
//   ).length;
//   const easyProblems = problems.filter((p) => p.difficulty === "easy").length;
//   const mediumProblems = problems.filter(
//     (p) => p.difficulty === "medium"
//   ).length;
//   const hardProblems = problems.filter((p) => p.difficulty === "hard").length;
//   const solvedEasy = problems.filter(
//     (p) => p.difficulty === "easy" && p.status === "solved"
//   ).length;
//   const solvedMedium = problems.filter(
//     (p) => p.difficulty === "medium" && p.status === "solved"
//   ).length;
//   const solvedHard = problems.filter(
//     (p) => p.difficulty === "hard" && p.status === "solved"
//   ).length;

  return (
    <div
      className="min-h-screen min-w-screen"
      style={{ backgroundColor: "#F8EDE3" }}
    >
      <Header />

      {/* Main Content */}
      {/* From this place to copy paste*/}
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-[#543310] dark:text-[#AF8F6F] mb-3">
              Practice DSA Problems
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A Platform inspired by Leetcode which helps you to prepare for
              coding interviews and helps you to improve your coding skills by
              solving coding problems
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
