// src/store/audioStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAudioStore = create(
  persist(
    (set, get) => ({
      // Core audio data
      audioFile: null, // actual File object
      title: "",
      description: "",
      selectedStyles: [],
      selectedCategory: "",
      
      // Setters
      setAudioFile: (file) => set({ audioFile: file }),
      setTitle: (title) => set({ title }),
      setDescription: (description) => set({ description }),
      setSelectedStyles: (styles) => set({ selectedStyles: styles }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),

      // Helper — clear session when needed
      clearAudioSession: () =>
        set({
          audioFile: null,
          title: "",
          description: "",
          selectedStyles: [],
          selectedCategory: "",
        }),
    }),
    {
      name: "audio-session", // key in localStorage
    }
  )
);

export default useAudioStore;
