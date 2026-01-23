import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
}));

export default useStore;
