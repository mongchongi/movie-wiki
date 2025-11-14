import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  selectedSort: '',
  selectedGenres: [],
  selectedGenreIds: [],

  setSelectedSort: (sortValue) => set({ selectedSort: sortValue }),
  setSelectedGenres: (genres) =>
    set({
      selectedGenres: genres,
      selectedGenreIds: genres.map((genre) => genre.id),
    }),
  setSelectedGenreIds: (ids) => set({ selectedGenreIds: ids }),

  resetFilters: () =>
    set({
      selectedSort: '',
      selectedGenres: [],
      selectedGenreIds: [],
    }),
}));
