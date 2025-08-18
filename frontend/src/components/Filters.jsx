import { useState } from "react";
import { Filter } from "lucide-react";

export default function Filters({
  allTags,
  selectedDifficulties,
  selectedStatus,
  selectedTags,
  handleDifficultyChange,
  handleTagChange,
  clearAllFilters,
  setSelectedStatus,
}) {
  const [showFilters, setShowFilters] = useState(false); // ✅ toggle for mobile

  const hasActiveFilters =
    selectedDifficulties.length > 0 ||
    selectedTags.length > 0 ||
    selectedStatus !== "Any";

  return (
    <>
      {/* ✅ Desktop Filters (always visible) */}
      <div className="hidden lg:block lg:col-span-1 min-w-2xs">
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
              <Filter className="w-5 h-5" />
              Filters
            </h3>
            {hasActiveFilters && (
              <button
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
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
              {["EASY", "MEDIUM", "HARD"].map((diff) => (
                <label
                  key={diff}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    style={{ accentColor: "#3b82f6" }}
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
              {["SOLVED", "UNSOLVED", "Any"].map((status) => (
                <label
                  key={status}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="status"
                    className="radio radio-sm"
                    style={{ accentColor: "#3b82f6" }}
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
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {allTags.slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagChange(tag)}
                  className={`px-3 py-1 rounded-full text-sm border transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-blue-600 text-white border-blue-500"
                      : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Filters (toggle with button) */}
      <div className="lg:hidden w-full mt-4">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-gray-800 text-white"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </span>
          <span>{showFilters ? "▲" : "▼"}</span>
        </button>

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 space-y-4">
            {/* Difficulty (dropdown for mobile) */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">
                Difficulty
              </label>
              <select
                className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
                value={selectedDifficulties[0] || ""}
                onChange={(e) => handleDifficultyChange(e.target.value)}
              >
                <option value="">All</option>
                {["EASY", "MEDIUM", "HARD"].map((diff) => (
                  <option key={diff} value={diff}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Status</label>
              <select
                className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="Any">Any</option>
                <option value="SOLVED">Solved</option>
                <option value="UNSOLVED">Unsolved</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto">
                {allTags.slice(0, 12).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagChange(tag)}
                    className={`px-3 py-1 rounded-full text-sm border transition-all ${
                      selectedTags.includes(tag)
                        ? "bg-blue-600 text-white border-blue-500"
                        : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}