import {create} from "zustand"
import {axiosInstance} from "../libs/axios.js"
import {toast} from "react-toastify"


export const usePlaylistStore = create((set) => ({
    playlists:[],
    currentPlaylist: null,
    isLoading :false,
    error: null,

    createPlaylist: async (playlistData) => {
        try {
            set({isLoading: true});
            const res = await axiosInstance.post("/playlist/create-playlist",playlistData);
            
            set((state) => ({
                playlists: [...state.playlists, res.data.playlist]
            }))
            toast("Playlist Created Successfully");
            return res.data.playlist;
        } catch (error) {
            console.log("Error Creating Playlist: ",error);
            toast("Failed to Create Playlist");
            throw error;
        }
        finally{
            set({isLoading: false})
        }
    },


    getAllPlaylists: async () => {
        try {
            set({isLoading: true});
            const res = await axiosInstance.get("/playlist");
            set({playlists: res.data.playlists})
        } catch (error) {
            console.error("Error fetching Playlists: ", error);
        }
        finally{
            set({isLoading: false})
        }
    },


    getPlaylistDetails: async (playlistId) => {
        try {
            set({isLoading: true});
            const res = await axiosInstance.get(`/playlist/${playlistId}`);
            set({currentPlaylist: res.data.playlist})
        } catch (error) {
            console.error("Error fetching Playlist details: ",error);
        }
        finally{
            set({isLoading: false})
        }
    },


    addProblemToPlaylist: async (playlistId,problemIds) => {
        try {
            set({isLoading: true})
            await axiosInstance.post(`/playlist/${playlistId}/add-problem`,{
                problemIds
            })
            toast("Problem Added to Playlist")

            // refreshing the playlist details
            if(get().currentPlaylist?.id === playlistId){
                await get().getPlaylistDetails(playlistId);
            }
        } catch (error) {
            console.error("Error adding problem to playlist: ", error);
            toast("Failed to add Problem To Playlist");
        }
        finally{
            set({isLoading: false})
        }
    },


    deletePlaylist: async (playlistId) => {
        try {
            set({isLoading: true});
            await axiosInstance.delete(`playlist/${playlistId}`);
            set((state) => ({
                playlists: state.playlists.filter((p) => p.id !== playlistId)
            }))
            toast("Playlist deleted Successfully");
        } catch (error) {
            console.error("Error deleting Playlist", error);
        }
        finally{
            set({isLoading: false})
        }
    }





}))