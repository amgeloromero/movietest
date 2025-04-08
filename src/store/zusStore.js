import {create} from 'zustand';
//COMENTARIO: AQUI SE CREA EL ESTADO GLOBAL DE LA APLICACION 
const zusStore = create((set) => ({
  movieImdb: null,
  setMovieImdb: (movieImdb) => set(() => ({ movieImdb })),
  favoritos: [],
  setFavoritos: (favoritos) => set(() => ({ favoritos })),

}));
export default zusStore;