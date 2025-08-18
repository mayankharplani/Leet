import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Zap,
  Target,
  Trophy,
  BotMessageSquare
} from "lucide-react";
import { toast } from "react-toastify";

{
  /* File Imports  */
}
import { useProblemStore } from "../store/useProblemStore.js";
import { useExecutionStore } from "../store/useExecutionStore.js";
import { useSubmissionStore } from "../store/useSubmissionStore.js";
import { getLanguageId } from "../libs/lang.js";
import SubmissionResults from "../components/SubmissionResults.jsx";
import SubmissionList from "../components/SubmissionList.jsx";
import RunningResults from "../components/RunningResults.jsx";
import TimerButton from "../components/TimerButton.jsx";
import HintButton from "../components/HintButton.jsx";

const ProblemPage = () => {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestCases] = useState([]);
  const initRef = useRef(null);
  const urlRef = useRef(window.location.href);

  {
    /* Stores  */
  }
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const { executeCode, isExecuting, submission,runCode, runningCode,isRunning } = useExecutionStore();
  const {
    submissionProblem,
    isLoading: isSubmissionLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();



  const normalizedSnippets = useMemo(() => {
    const src = problem?.codeSnippets || {};
    // make keys consistent (UPPERCASE)
    return Object.fromEntries(
      Object.entries(src).map(([k, v]) => [k.toUpperCase(), v])
    );
  }, [problem]);



  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [id]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

  useEffect(() => {
    if (!problem) return;

    // prevent re-initializing when user switches languages
    if (initRef.current === problem.id) return;
    initRef.current = problem.id;

    const keys = Object.keys(normalizedSnippets);
    if (keys.length) {
      const first = keys[0]; // first available snippet
      setSelectedLanguage(first); // store in UPPERCASE
      setCode(normalizedSnippets[first]); // set editor code
    }

    setTestCases(
      (problem.testcases || []).map((tc) => ({
        input: tc.input,
        output: tc.output,
      }))
    );
  }, [problem, normalizedSnippets]);

  useEffect(() => {
    if (!selectedLanguage) return;
    setCode(normalizedSnippets[selectedLanguage.toUpperCase()] || "");
  }, [selectedLanguage, normalizedSnippets]);


  
  const handleRunCode = (e) => {
      e.preventDefault();
      try {
        const language_id = getLanguageId(selectedLanguage);
        const stdin = problem.testcases.map((tc) => tc.input);
        const expected_outputs = problem.testcases.map((tc) => tc.output)
        runCode(code, language_id, stdin, expected_outputs, id)
      } catch (error) {
         console.log("Error running Code", error);
      }
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      console.log("Error executing Code", error);
    }
  }




  const handleCopy = () => {
    navigator.clipboard
      .writeText(urlRef.current)
      .then(() => {
        toast("Link Copied", {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.log("Error in Copying", err);
        toast("Copy Failed", {
          position: "top-center",
        });
      });
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problem.codeSnippets?.[lang] || "");
  };

  console.log("Submissions", submissionCount);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toUpperCase()) {
      case "EASY":
        return "text-emerald-400 bg-emerald-900/20 border-emerald-500/30";
      case "MEDIUM":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-500/30";
      case "HARD":
        return "text-red-400 bg-red-900/20 border-red-500/30";
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-500/30";
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose prose-invert max-w-none">
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--steel)] to-[var(--navy)] rounded-xl flex items-center justify-center">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Problem Description
                </h3>
              </div>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                {problem?.description}
              </p>
            </div>

            {problem?.examples && (
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Examples
                  </h3>
                </div>
                {Object.entries(problem?.examples).map(
                  ([lang, example], idx) => (
                    <div
                      key={lang}
                      className="bg-[var(--navy-dark)] border border-[var(--steel)] p-4 sm:p-6 rounded-xl mb-4 sm:mb-6"
                    >
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[var(--steel)] rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {idx + 1}
                          </span>
                        </div>
                        <span className="text-[var(--beige)] font-semibold capitalize text-sm sm:text-base">
                          {lang}
                        </span>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <div className="text-emerald-400 mb-2 text-sm font-semibold flex items-center gap-2">
                            <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                            Input:
                          </div>
                          <div className="bg-black/60 border border-gray-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-mono text-gray-200 text-xs sm:text-sm">
                            {example?.input}
                          </div>
                        </div>
                        <div>
                          <div className="text-blue-400 mb-2 text-sm font-semibold flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            Output:
                          </div>
                          <div className="bg-black/60 border border-gray-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-mono text-gray-200 text-xs sm:text-sm">
                            {example?.output}
                          </div>
                        </div>
                        {example?.explanation && (
                          <div>
                            <div className="text-purple-400 mb-2 text-sm font-semibold flex items-center gap-2">
                              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                              Explanation:
                            </div>
                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed bg-black/40 p-3 sm:p-4 rounded-lg border border-gray-700">
                              {example?.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {problem?.constraints && (
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Constraints
                  </h3>
                </div>
                <div className="bg-[var(--navy-dark)] border border-[var(--steel)] p-4 sm:p-6 rounded-xl">
                  <div className="bg-black/60 border border-gray-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-mono text-gray-200 text-sm sm:text-base md:text-lg">
                    {problem?.constraints}
                  </div>
                </div>
              </div>
            )}

            {problem?.hints && (
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Hints
                  </h3>
                </div>
                <div className="bg-[var(--navy-dark)] border border-[var(--steel)] p-4 sm:p-6 rounded-xl">
                  <div className="bg-black/60 border border-gray-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-200 text-sm sm:text-base md:text-lg">
                    {problem?.hints}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "submissions":
        return (
            <SubmissionList submissions={submissionProblem} isLoading={isSubmissionLoading} />
        );
      case "discussion":
        return (
          <div className="text-center py-8 sm:py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--navy-dark)] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--beige)]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              No Discussions Yet
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Start the conversation about this problem!
            </p>
          </div>
        );
      case "hints":
        return (
          <div className="text-center py-8 sm:py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--navy-dark)] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--beige)]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              No Hints Available
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Try solving this problem on your own first!
            </p>
          </div>
        );
      case "AI":
        return (
          <HintButton problem={problem} userCode={code} />
        );
      default:
        return null;
    }
  };

  if (isProblemLoading) {
    return (
      <div className="min-h-screen min-w-screen bg-[var(--navy-dark)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--steel)] border-t-[var(--beige)] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--beige)] text-lg">Loading Problem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--navy-dark)] text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--beige) 1px, transparent 0)`,
              backgroundSize: "100px 100px",
            }}
          ></div>
        </div>
      </div>

      {/* Header Navigation */}
      {/* Header Navigation */}
      <nav className="relative z-10 bg-[var(--navy)] border-b border-[var(--steel)] shadow-2xl px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
        <div className="min-w-screen mx-auto">
          {/* Mobile Layout - Compact */}
          <div className="lg:hidden px-2">
            <div className="flex items-center justify-between gap-3">
              {/* Left - Back Button & Title */}
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Link
                  to={"/problems"}
                  className="flex items-center gap-1 text-[var(--beige)] hover:text-white transition-colors duration-200 p-1.5 rounded-lg hover:bg-[var(--steel)] flex-shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Link>

                <div className="min-w-0 flex-1">
                  <h1
                    className="text-base sm:text-lg font-bold truncate"
                    style={{ color: "var(--cream)" }}
                  >
                    {problem?.title}
                  </h1>
                  <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
                    <div
                      className={`px-2 py-0.5 rounded-full border text-xs font-medium ${getDifficultyColor(
                        problem?.difficulty
                      )}`}
                    >
                      {problem?.difficulty}
                    </div>
                    <span>•</span>
                    <span>{submissionCount} submissions</span>
                  </div>
                </div>
              </div>

              {/* Right - Essential Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    isBookmarked
                      ? "text-yellow-400 bg-yellow-900/20"
                      : "text-gray-400 hover:text-yellow-400 hover:bg-yellow-900/20"
                  }`}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                  <select
                    className="select bg-[var(--steel)] border-[var(--beige)] text-white rounded-lg focus:border-[var(--beige)] focus:ring-2 focus:ring-[var(--beige)] focus:ring-opacity-20 text-xs min-w-20"
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                  >
                    {Object.keys(problem?.codeSnippets || {}).map((lang) => (
                      <option key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Full Featured */}
          <div className="hidden lg:block px-4 ">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
              {/* Left Section - Back Button & Problem Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <Link
                  to={"/problems"}
                  className="flex items-center gap-2 text-[var(--beige)] hover:text-white transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-[var(--steel)]"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Back to Problems</span>
                </Link>

                <div className="hidden sm:block w-px h-6 bg-[var(--steel)]"></div>

                <div className="flex-1 min-w-0">
                  <h1
                    className="text-lg sm:text-xl md:text-2xl font-bold mb-2"
                    style={{ color: "var(--cream)" }}
                  >
                    {problem?.title}
                  </h1>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--beige)]" />
                      <span>
                        {new Date(problem?.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 bg-[var(--steel)] rounded-full"></div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--beige)]" />
                      <span>{submissionCount} Submissions</span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 bg-[var(--steel)] rounded-full"></div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--beige)]" />
                      <span>95% Success Rate</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div
                  className={`px-3 py-1.5 rounded-full border text-xs sm:text-sm font-medium ${getDifficultyColor(
                    problem?.difficulty
                  )}`}
                >
                  {problem?.difficulty}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      isBookmarked
                        ? "text-yellow-400 bg-yellow-900/20"
                        : "text-gray-400 hover:text-yellow-400 hover:bg-yellow-900/20"
                    }`}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg text-gray-400 hover:text-[var(--beige)] hover:bg-[var(--steel)] transition-all duration-200"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    className="select bg-[var(--steel)] border-[var(--beige)] text-white rounded-lg focus:border-[var(--beige)] focus:ring-2 focus:ring-[var(--beige)] focus:ring-opacity-20 text-sm sm:text-base min-w-32"
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                  >
                    {Object.keys(problem?.codeSnippets || {}).map((lang) => (
                      <option key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 min-w-screen mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Panel - Problem Details */}
          <div className="bg-[var(--navy)] border border-[var(--steel)] rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-[var(--steel)] px-3 sm:px-4 md:px-6 py-3 sm:py-4">
              <div className="tabs tabs-bordered tabs-lifted gap-1">
                <button
                  className={`tab flex flex-col gap-1  sm:gap-2 text-sm sm:text-md md:text-base transition-all duration-200 ${
                    activeTab === "description"
                      ? "tab-active bg-[var(--navy)] rounded-xl text-white border-[var(--steel)]"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  <FileText className="w-4 h-4 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Description</span>
                </button>
                <button
                  className={`tab gap-1 sm:gap-2 text-xs sm:text-sm md:text-base transition-all duration-200 ${
                    activeTab === "submissions"
                      ? "tab-active bg-[var(--navy)] rounded-xl text-white border-[var(--steel)]"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-4 h-4 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Submissions</span>
                </button>
                <button
                  className={`tab gap-1 sm:gap-2 text-xs sm:text-sm md:text-base transition-all duration-200 ${
                    activeTab === "discussion"
                      ? "tab-active bg-[var(--navy)] rounded-xl text-white border-[var(--steel)]"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("discussion")}
                >
                  <MessageSquare className="w-4 h-4 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Discussion</span>
                </button>
                <button
                  className={`tab gap-1 sm:gap-2 text-xs sm:text-sm md:text-base transition-all duration-200 ${
                    activeTab === "hints"
                      ? "tab-active bg-[var(--navy)] rounded-xl text-white border-[var(--steel)]"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("hints")}
                >
                  <Lightbulb className="w-4 h-4 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Hints</span>
                </button>
                <button
                  className={`tab gap-1 sm:gap-2 text-xs sm:text-sm md:text-base transition-all duration-200 ${
                    activeTab === "AI"
                      ? "tab-active bg-[var(--navy)] rounded-xl text-white border-[var(--steel)]"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("AI")}
                >
                  <BotMessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">AI</span>
                </button>
              </div>
            </div>
            <div className="p-3 sm:p-4 md:p-6 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto custom-scrollbar">
              {renderTabContent()}
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="bg-[var(--navy)] border border-[var(--steel)] rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-[var(--steel)] px-3 sm:px-4 md:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between gap-2 text-white">
                <div className="flex gap-2">
                  <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--beige)]" />
                <span className="font-semibold text-sm sm:text-base">
                  Code Editor
                </span>
                </div>
                <TimerButton/>
              </div>
            </div>
            <div className="h-[50vh] sm:h-[60vh] md:h-[70vh] w-full">
              <Editor
                height={"100%"}
                language={selectedLanguage.toLowerCase()}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 12,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  readOnly: false,
                  automaticLayout: true,
                  theme: "vs-dark",
                }}
              />
            </div>
            <div className="p-3 sm:p-4 border-t border-[var(--steel)] bg-[var(--steel)]">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                <button
                  className={`btn gap-2 transition-all duration-200 w-full sm:w-auto ${
                    isRunning
                      ? "bg-[var(--steel-dark)] text-gray-400 cursor-not-allowed"
                      : "bg-[var(--beige)] rounded-xl text-[var(--navy)] hover:bg-[var(--steel)] hover:text-white"
                  }`}
                  onClick={handleRunCode}
                  disabled={isRunning}
                >
                  {!isRunning && <Play className="w-4 h-4" />}
                  <span className="text-sm sm:text-base">
                    {isRunning ? "Running..." : "Run Code"}
                  </span>
                </button>
                <button className={` btn  gap-2 transition-all duration-200 w-full sm:w-auto
                  ${
                    isExecuting ?  " bg-green-300 text-gray-400 cursor-not-allowed" : "bg-[var(--success)] rounded-xl text-white hover:bg-green-600"
                  }
                  
                  
                  `}
                  onClick={handleSubmitCode}
                  disabled={isExecuting}
                  >
                  {!isExecuting &&  <CheckCircle className="w-4 h-4" />}
                  <span className="text-sm sm:text-base">{isExecuting ? "Submitting..." : "Submit Code"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Test Cases Section */}
        <div className="mt-6 sm:mt-8 bg-[var(--navy)] border border-[var(--steel)] rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-[var(--steel)] px-3 sm:px-4 md:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-2 text-white">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--beige)]" />
              <span className="font-semibold text-sm sm:text-base">
                Test Cases
              </span>
            </div>
          </div>
          <div className="p-3 sm:p-4 md:p-6">
            {submission ? (
              <SubmissionResults submission={submission} />
            ) : runningCode ? ( <RunningResults data={runningCode}  />  )  : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="border-b border-[var(--steel)]">
                      <th className="text-[var(--beige)] font-semibold text-left py-3 sm:py-4 text-sm sm:text-base">
                        Input
                      </th>
                      <th className="text-[var(--beige)] font-semibold text-left py-3 sm:py-4 text-sm sm:text-base">
                        Expected Output
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {testcases.map((testCase, index) => (
                      <tr
                        key={index}
                        className="border-b border-[var(--steel)] hover:bg-[var(--navy-dark)] transition-colors duration-200"
                      >
                        <td className="font-mono text-gray-300 py-3 sm:py-4 text-xs sm:text-sm md:text-base break-all">
                          {testCase.input}
                        </td>
                        <td className="font-mono text-gray-300 py-3 sm:py-4 text-xs sm:text-sm md:text-base break-all">
                          {testCase.output}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--navy-dark);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--steel);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--beige);
        }

        @media (max-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProblemPage;
