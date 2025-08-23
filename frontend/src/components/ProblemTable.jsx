import React,{useState, useMemo, useEffect} from 'react'
import {useAuthStore} from "../store/useAuthStore.js"
import {useActions} from "../store/useAction.js"
import {Link} from "react-router-dom"
import {Bookmark,PencilIcon, Trash, TrashIcon, Plus, Code, Loader2} from "lucide-react"
import { useProblemStore } from '../store/useProblemStore.js'
import { usePlaylistStore } from '../store/usePlaylistStore.js'
import AddToPlaylist from './AddToPlaylist.jsx'
import CreatePlaylistModal from './CreatePlaylistModal.jsx'

const ProblemTable = ({problems, selectedDifficulties = [], selectedStatus = "Any", selectedTags = []}) => {
    const {authUser} = useAuthStore();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1); 
    const [IsCreateModalOpen,setIsCreateModalOpen] = useState(false)
    const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false)
    const [selectedProblemId,setSelectedProblemId] = useState(null);
    const {isDeletingProblem, onDeleteProblem} = useActions()
    const {getAllProblems} = useProblemStore()
    const {createPlaylist} = usePlaylistStore()

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedDifficulties, selectedStatus, selectedTags]);

    // UNIQUE TAGS IN SELECT LOGIC
    const allTags = useMemo(() => {
        if(!Array.isArray(problems)) return [];

        const tagSet = new Set();

        problems.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));

        return Array.from(tagSet)
    },[problems])

    // ENHANCED FILTERING LOGICS
    const filteredProblems = useMemo(() => {
        return (problems || []).filter((problem) => {
            // Search filter
            const matchesSearch = problem.title.toLowerCase().includes(search.toLowerCase());
            
            // Difficulty filter
            const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(problem.difficulty);
            
            // Status filter
            let matchesStatus = true;
            if (selectedStatus !== "Any") {
                const isSolved = problem.solvedBy?.some(user => user.userId === authUser?.id);
                if (selectedStatus === "SOLVED") {
                    matchesStatus = isSolved;
                } else if (selectedStatus === "UNSOLVED") {
                    matchesStatus = !isSolved;
                }
            }
            
            // Tags filter
            const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => problem.tags?.includes(tag));
            
            return matchesSearch && matchesDifficulty && matchesStatus && matchesTags;
        });
    }, [problems, search, selectedDifficulties, selectedStatus, selectedTags, authUser?.id]);

    // PAGINATION LOGIC
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredProblems.length / itemsPerPage)
    const paginatedProblems = useMemo(() => {
        return filteredProblems.slice((currentPage - 1 ) * itemsPerPage,currentPage * itemsPerPage )
    },[filteredProblems,currentPage])

    const handleDelete = (id) => {
      onDeleteProblem(id);
      getAllProblems();
    }

    const handleAddToPlaylist = (id) => {
      setSelectedProblemId(id)
      setIsAddToPlaylistModalOpen(true);
    }

    const handleCreatePlaylist = async (data) => {
      await createPlaylist(data)
    }

    return (
        <div className='w-full mx-auto'>
            {/* Header Section */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
                <div className="flex items-center gap-4">
                    <span className="text-lg font-medium text-white">
                        {filteredProblems.length} problems found
                        {filteredProblems.length !== problems.length && (
                            <span className="text-sm font-normal ml-2 text-gray-400">
                                (filtered from {problems.length} total)
                            </span>
                        )}
                    </span>
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    {/* Search Bar */}
                    <div className="relative flex-1 sm:flex-none">
                        <input 
                            type="text"
                            placeholder="Search problems..."
                            className="input input-bordered w-full sm:w-80 pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    
                    {/* Create Playlist Button */}
                    <button className='btn btn-primary gap-2 hover:scale-105 transition-transform duration-200 whitespace-nowrap bg-blue-600 hover:bg-blue-700 border-blue-600 text-white'
                    onClick={() => setIsCreateModalOpen(true)}
                    >
                        <Plus className='w-4 h-4' />
                        <span className="hidden sm:inline">Create Playlist</span>
                        <span className="sm:hidden">Create</span>
                    </button>
                </div>
            </div>

            {/* Problems Table - Desktop View */}
            <div className='hidden lg:block overflow-x-auto rounded-xl shadow-lg border border-gray-700 bg-gray-800'>
                <table className='table table-lg w-full'>
                    <thead>
                        <tr className="bg-gray-700">
                            <th className='text-gray-200 font-semibold text-center'>Status</th>
                            <th className='text-gray-200 font-semibold'>Problem</th>
                            <th className='text-gray-200 font-semibold'>Tags</th>
                            <th className='text-gray-200 font-semibold'>Difficulty</th>
                            <th className='text-gray-200 font-semibold text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paginatedProblems.length > 0 ? (
                  paginatedProblems.map((problem, index) => {
                    const isSolved = problem.solvedBy?.some(
                      (user) => user.userId === authUser?.id
                    ) || false;
                    
                    
                    return (
                      <tr key={problem.id} className={`hover:bg-gray-700 transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}`}>
                        <td className='text-center'>
                          <div className="flex justify-center">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              isSolved 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-400 bg-transparent'
                            }`}>
                              {isSolved && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <Link to={`/problem/${problem.id}`} className="font-semibold hover:underline transition-all duration-200 text-white hover:text-blue-300">
                            {problem.title}
                          </Link>
                        </td>
                        <td>
                          <div className="flex flex-wrap gap-1">
                            {(problem.tags || []).slice(0, 2).map((tag, idx) => (
                              <span
                                key={idx}
                                className="badge badge-outline text-xs font-bold px-2 py-1 border-gray-500 text-gray-300 hover:border-blue-500 hover:text-blue-300 transition-colors duration-200"
                              >
                                {tag}
                              </span>
                            ))}
                            {(problem.tags || []).length > 2 && (
                              <span className="text-xs text-gray-400 font-medium">
                                +{(problem.tags || []).length - 2} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge font-semibold text-xs text-white px-3 py-1 rounded-full ${
                              problem.difficulty === "EASY"
                                ? "bg-green-600"
                                : problem.difficulty === "MEDIUM"
                                ? "bg-yellow-600"
                                : "bg-red-600"
                            }`}
                          >
                            {problem.difficulty}
                          </span>
                        </td>
                        <td>
                          <div className="flex justify-center gap-2">
                           {
                            authUser?.role === "ADMIN" ? (
                               <>
                               <button 
                               onClick={() => handleDelete(problem.id)}
                               className='text-red-500 hover:text-red-400 transition-colors duration-200 cursor-pointer'>
                              {
                                isDeletingProblem ? <Loader2 className='animate-spin w-4' /> : <Trash className='w-5 h-5'/> 
                              }
                            </button>
                            <button className='text-yellow-500 hover:text-yellow-400 transition-colors duration-200 cursor-pointer'>
                              <Bookmark className='w-5 h-5'/> 
                            </button>
                               </>
                            ) : null
                           }
                            <button
                              className="btn btn-sm btn-outline ml-2 flex gap-2 items-center hover:scale-105 transition-transform duration-200 border-gray-500 text-gray-300 hover:border-[#F5EFE7] hover:text-[#213555] hover:bg-[#F5EFE7] hover:bg-opacity-50"
                              onClick={() => handleAddToPlaylist(problem.id)}
                            >
                              <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
                                <Plus className="w-3 h-3" />
                              </div>
                              <span className="hidden sm:inline">Add to Playlist</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className='text-center py-12'>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Code className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-lg font-medium text-gray-300">No Problems Found</p>
                        <p className="text-sm text-gray-400">
                          {filteredProblems.length === 0 && problems.length > 0 
                            ? "Try adjusting your search or filter criteria"
                            : "No problems available at the moment"
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                )
                        }
                    </tbody>
                </table>
            </div>

            {/* Problems Cards - Mobile/Tablet View */}
            <div className='lg:hidden space-y-4'>
                {paginatedProblems.length > 0 ? (
                    paginatedProblems.map((problem, index) => {
                        const isSolved = problem.solvedBy?.some(
                            (user) => user.userId === authUser?.id
                        ) || false;
                        
                        // Debug logging (remove in production)
                        
                        return (
                            <div key={problem.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-200">
                                {/* Problem Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="flex-shrink-0">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                              isSolved 
                                                ? 'border-blue-500 bg-blue-500' 
                                                : 'border-gray-400 bg-transparent'
                                            }`}>
                                              {isSolved && (
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                              )}
                                            </div>
                                        </div>
                                        <Link 
                                            to={`/problem/${problem.id}`} 
                                            className="font-semibold text-white hover:text-blue-300 transition-colors duration-200 text-sm sm:text-base line-clamp-2 flex-1"
                                        >
                                            {problem.title}
                                        </Link>
                                    </div>
                                    <span
                                        className={`badge font-semibold text-xs text-white px-3 py-1 rounded-full ml-2 flex-shrink-0 ${
                                            problem.difficulty === "EASY"
                                                ? "bg-green-600"
                                                : problem.difficulty === "MEDIUM"
                                                ? "bg-yellow-600"
                                                : "bg-red-600"
                                        }`}
                                    >
                                        {problem.difficulty}
                                    </span>
                                </div>

                                {/* Tags */}
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {(problem.tags || []).slice(0, 3).map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="badge badge-outline text-xs font-medium px-2 py-1 border-gray-500 text-gray-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {(problem.tags || []).length > 3 && (
                                            <span className="text-xs text-gray-400 font-medium self-center">
                                                +{(problem.tags || []).length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {authUser?.role === "ADMIN" && (
                                            <>
                                                <button 
                                                onClick={() => handleDelete(problem.id)}
                                                className='p-2 text-red-500 hover:text-white hover:bg-red-400  hover:bg-opacity-10 rounded-lg transition-all duration-200'>
                                                    {
                                                      isDeletingProblem ? <Loader2 className='animate-spin w-4 h-4' /> : <Trash className='w-4 h-4'/> 
                                                    }
                                                </button>
                                                <button className='p-2 text-yellow-500 hover:text-white hover:bg-yellow-400  hover:bg-opacity-10 rounded-lg transition-all duration-200'>
                                                    <Bookmark className='w-4 h-4'/> 
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    <button
                                        className="btn btn-sm btn-outline flex gap-2 items-center hover:scale-105 transition-transform duration-200 border-gray-500 text-gray-300 hover:border-[#F5EFE7] hover:text-[#213555] hover:bg-[#F5EFE7] hover:bg-opacity-50"
                                        onClick={() => handleAddToPlaylist(problem.id)}
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span className="hidden sm:inline">Add to Playlist</span>
                                        <span className="sm:hidden">Add</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Code className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-lg font-medium text-gray-300">No Problems Found</p>
                        <p className="text-sm text-gray-400 px-4">
                            {filteredProblems.length === 0 && problems.length > 0 
                                ? "Try adjusting your search or filter criteria"
                                : "No problems available at the moment"
                            }
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className='flex justify-center mt-8 gap-3'>
                <button className='btn btn-sm hover:scale-105 transition-transform duration-200 bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev-1) }
                >
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                </button>
                <span className='btn btn-ghost btn-sm font-medium text-gray-300 bg-gray-800 border-gray-600'>
                    {currentPage} / {totalPages}
                </span>
                <button className='btn btn-sm hover:scale-105 transition-transform duration-200 bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev+1) }
                >
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">Next</span>
                </button>
            </div>
            <CreatePlaylistModal
            isOpen={IsCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreatePlaylist}
            />
          <AddToPlaylist 
          isOpen={isAddToPlaylistModalOpen}
          onClose={() => setIsAddToPlaylistModalOpen(false)}
          problemId={selectedProblemId}
          />
           

        </div>
    )
}

export default ProblemTable