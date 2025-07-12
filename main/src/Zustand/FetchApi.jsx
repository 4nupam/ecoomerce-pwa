import { create } from 'zustand';

const FetchApi = create((set) => ({
  data: [],
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const json = await response.json();
      set({ data: json.categories, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default FetchApi;
