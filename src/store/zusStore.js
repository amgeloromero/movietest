import {create} from 'zustand';
const zusStore = create((set) => ({
  movieImdb: null,
  setMovieImdb: (movieImdb) => set(() => ({ movieImdb })),
  favoritos: [],
  setFavoritos: (favoritos) => set(() => ({ favoritos })),

}));

export default zusStore;