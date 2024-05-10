import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // bu dizi hiç değişmiycek
  mainJobs: [],
  // buraya filtrelenenleri aktarıcaz
  jobs: [],
  // apidan cevap geldi mi ?
  initialized: false,
  // hata oluştu mu?
  isError: false,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
      state.mainJobs = action.payload;
      state.initialized = true;
      state.isError = false;
    },
    setError: (state) => {
      state.initialized = true;
      state.isError = true;
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },

    filterBySearch: (state, action) => {
      // arama termini küçük harfe çevirme
      const query = action.payload.toLowerCase();

      // arama termiyle eşleşen bütün işleri filtrele
      const filter = state.mainJobs.filter((job) =>
        job.company.toLowerCase().includes(query)
      );

      // state'i güncelleme
      state.jobs = filter;
    },

    filterByStatus: (state, action) => {
      // gelen duruma sahip bütün işleri filtreleme
      const filtred = state.mainJobs.filter(
        (job) => job.status === action.payload
      );

      state.jobs = filtred;
    },

    filterByType: (state, action) => {
      state.jobs = state.mainJobs.filter(
        (job) => job.type === action.payload
      );
    },

    sortJobs: (state, action) => {
      switch (action.payload) {
        case 'a-z':
          state.jobs.sort((a, b) =>
            a.company.localeCompare(b.company)
          );
          break;
        case 'z-a':
          state.jobs.sort((a, b) =>
            b.company.localeCompare(a.company)
          );
          break;
        case 'En Yeni':
          state.jobs.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          break;
        case 'En Eski':
          state.jobs.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          break;

        default:
          return state;
      }
    },

    clearFilters: (state) => {
      state.jobs = state.mainJobs;
    },
  },
});

export const {
  setJobs,
  setError,
  addJob,
  filterBySearch,
  filterByStatus,
  filterByType,
  sortJobs,
  clearFilters,
} = jobSlice.actions;

export default jobSlice.reducer;