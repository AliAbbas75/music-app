import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAudioStore = create(
  persist(
    (set, get) => ({
      // ─── Core Audio Metadata ──────────────────────────────
      audioFile: null,           // File object (not persisted)
      title: "",
      description: "",
      selectedStyles: [],
      selectedCategory: "",

      // ─── Web Audio Context & Processing Data ──────────────
      audioBuffer: null,         // Decoded AudioBuffer (not persisted)
      effects: [],               // Always array
      isPlaying: false,
      duration: 0,
      currentTime: 0,

      // ─── Setters ──────────────────────────────────────────
      setAudioFile: (file) => set({ audioFile: file }),
      setTitle: (title) => set({ title }),
      setDescription: (description) => set({ description }),
      setSelectedStyles: (styles) => set({ selectedStyles: styles }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),

      // ─── Web Audio-Specific Setters ───────────────────────
      setAudioBuffer: (buffer) => set({ audioBuffer: buffer }),
      setEffects: (effects) => set({ effects: Array.isArray(effects) ? effects : [] }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setDuration: (duration) => set({ duration }),
      setCurrentTime: (time) => set({ currentTime: time }),

      // ─── Helpers ──────────────────────────────────────────
      clearAudioSession: () =>
        set({
          audioFile: null,
          title: "",
          description: "",
          selectedStyles: [],
          selectedCategory: "",
          audioBuffer: null,
          effects: [],
          isPlaying: false,
          duration: 0,
          currentTime: 0,
        }),

      // ─── Derived Actions ─────────────────────────────────
      toggleEffect: (effect) => {
        const current = Array.isArray(get().effects) ? get().effects : [];
        const updated = current.includes(effect)
          ? current.filter((e) => e !== effect)
          : [...current, effect];
        set({ effects: updated });
      },
    }),
    {
      name: "audio-session",
      partialize: (state) => ({
        title: state.title,
        description: state.description,
        selectedStyles: state.selectedStyles,
        selectedCategory: state.selectedCategory,
        effects: state.effects,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (!Array.isArray(state.effects)) {
            state.effects = [];
          }
        }
      },
    }
  )
);

export default useAudioStore;
