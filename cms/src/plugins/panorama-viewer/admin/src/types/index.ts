import type { Dispatch, SetStateAction } from 'react';
export type StateSetter<T> = Dispatch<SetStateAction<T>>;

export type PanoramaFile = {
  id: string;
  file: File;
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

export type EditorState = {
  panoramas: PanoramaFile[];
  activePanoramaId: string | null;
  hotspots: Hotspot[];
  draggingHotspotId: string | null;
};
