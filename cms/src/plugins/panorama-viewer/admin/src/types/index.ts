import type { Dispatch, SetStateAction } from 'react';
export type StateSetter<T> = Dispatch<SetStateAction<T>>;

export type PanoramaFile = {
  id: string;
  file: File;
  name: string;
};

export type Hotspot = {
  id: string;
  panoramaId: string;
  type: 'link' | 'info';
  position: {
    x: number;
    y: number;
    z: number;
  } | null;
  targetPanoramaId?: string;
  infoText?: string;
};

export type TourDetails = {
  title: string;
  thumbnail: File | null;
};

export type EditorState = {
  panoramas: PanoramaFile[];
  activePanoramaId: string | null;
  hotspots: Hotspot[];
  draggingHotspotId: string | null;
  tourDetails: TourDetails;
  actions: EditorStateActions;
};
export type EditorStateActions = {
  setPanoramas: (panoramas: PanoramaFile[]) => void;
  setHotspots: (hotspots: Hotspot[]) => void;
  setActivePanoramaId: (id: string | null) => void;
  setDraggingHotspotId: (id: string | null) => void;
  removePanorama: (id: string) => void;
  removeHotspot: (id: string) => void;
  setTourDetails: (tourDetails: TourDetails) => void;
  reset: () => void;
};
