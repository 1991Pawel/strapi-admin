import { create } from 'zustand';
import { EditorState } from 'src/types';

const useStore = create<EditorState>((set, _get, store) => ({
  panoramas: [],
  hotspots: [],
  draggingHotspotId: null,
  activePanoramaId: null,
  tourDetails: {
    title: '',
    thumbnail: null,
  },

  actions: {
    setHotspots: (hotspots) => set(() => ({ hotspots })),
    removeHotspot: (id) =>
      set((state) => ({
        hotspots: state.hotspots.filter((h) => h.id !== id),
      })),
    setActivePanoramaId: (id) => set(() => ({ activePanoramaId: id })),
    setDraggingHotspotId: (id) => set(() => ({ draggingHotspotId: id })),
    setPanoramas: (panoramas) => set(() => ({ panoramas })),
    removePanorama: (id) =>
      set((state) => ({
        panoramas: state.panoramas.filter((p) => p.id !== id),
        hotspots: state.hotspots.filter((h) => h.panoramaId !== id),
        activePanoramaId: state.activePanoramaId === id ? null : state.activePanoramaId,
      })),
    reset: () => set(store.getInitialState()),
  },
}));

export const useDraggingHotspotId = () => useStore((state) => state.draggingHotspotId);
export const useSetDraggingHotspotId = () =>
  useStore((state) => state.actions.setDraggingHotspotId);
export const useHotspots = () => useStore((state) => state.hotspots);
export const useSetHotspots = () => useStore((state) => state.actions.setHotspots);
export const usePanoramas = () => useStore((state) => state.panoramas);
export const useSetPanoramas = () => useStore((state) => state.actions.setPanoramas);
export const useActivePanoramaId = () => useStore((state) => state.activePanoramaId);
export const useSetActivePanoramaId = () => useStore((state) => state.actions.setActivePanoramaId);
export const useRemovePanorama = () => useStore((state) => state.actions.removePanorama);
export const useResetStore = () => useStore((state) => state.actions.reset);
export const useRemoveHotspot = () => useStore((state) => state.actions.removeHotspot);

export default useStore;
