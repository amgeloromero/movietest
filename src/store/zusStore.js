import {create} from 'zustand';
const zusStore = create((set) => ({

  movieImdb: null,
  setMovieImdb: (movieImdb) => set(() => ({ movieImdb })),
  favoritos: [],
  setFavoritos: (favoritos) => set(() => ({ favoritos })),
/*
  movieImdb: null,
  setMovieImdb: (id) => set({ movieImdb: id }),
*/
/*
  isLogin: false,
  setIsLogin: (isLogin) => set(() => ({ isLogin })),
  loader: false,
  setLoader: (loader) => set(() => ({ loader })),
  tour: true,
  setTour: (tour) => set(() => ({ tour })),
  isVisible: false,
  setIsVisible: (isVisible) => set(() => ({ isVisible })),
  centrotrab: 0,
  setCentroTrab: (centrotrab) => set(() => ({ centrotrab })),
  nombrecentrotrab: null,
  setNombreCentroTrab: (nombrecentrotrab) => set(() => ({ nombrecentrotrab })),
  acronimo: null,
  setAcronimo: (acronimo) => set(() => ({ acronimo })),
  contratotrab: null,
  setContratotrab: (contratotrab) => set(() => ({ contratotrab })),
  documentostrab: null,
  setDocumentostrab: (documentostrab) => set(() => ({ documentostrab })),
  expiracionestrab: [],
  setExpiracionestrab: (expiracionestrab) => set(() => ({ expiracionestrab })),
  tipologin: null,
  setTipologin: (tipologin) => set(() => ({ tipologin })),  
  compatiblefinger: false,
  setcompatiblefinger: (compatiblefinger) => set(() => ({ compatiblefinger })),

  fotouser: false,
  setFotouser: (fotouser) => set(() => ({ fotouser })),
  dataliccinducirstate: false,
  setDataliccinducirstate: (dataliccinducirstate) => set(() => ({ dataliccinducirstate })),
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
 
  licconducirinfo: null,
  setLicconducirinfo: (licconducirinfo) => set(() => ({ licconducirinfo })),
  vehiculoslic: [],
  setVehiculoslic: (vehiculoslic) => set(() => ({ vehiculoslic })),
  areas: [],
  setAreas: (areas) => set(() => ({ areas })),  
  documentosfechaslic: [],
  setDocumentosfechaslic: (documentosfechaslic) => set(() => ({ documentosfechaslic })),
  restricciones: [],
  setRestricciones: (restricciones) => set(() => ({ restricciones })),
  clases: [],
  setClases: (clases) => set(() => ({ clases })),*/
}));

export default zusStore;