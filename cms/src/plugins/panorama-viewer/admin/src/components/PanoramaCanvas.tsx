import { useTexture } from '@react-three/drei';
import { type Camera, Vector3 } from 'three';
import { Hotspot } from './Hotspot';
import { useThree, ThreeEvent } from '@react-three/fiber';
import {
  useActivePanoramaId,
  useDraggingHotspotId,
  useHotspots,
  useSetHotspots,
} from '../store/useStore';

type PanoramaCanvasProps = {
  src: string;
};
const R = 50;

const PanoramaCanvas = ({ src }: PanoramaCanvasProps) => {
  const texture = useTexture(src);
  const activePanoramaId = useActivePanoramaId();
  const hotspots = useHotspots();
  const setHotspots = useSetHotspots();
  const draggingHotspotId = useDraggingHotspotId();

  const selectedPanoramaHotspots = hotspots.filter(
    (hotspot) => hotspot.panoramaId === activePanoramaId
  );

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (draggingHotspotId !== null) {
      e.stopPropagation();
      const dir = e.point.clone().normalize();
      const newPos = dir.multiplyScalar(R - 0.5);
      const offsetY = 16;
      setHotspots(
        hotspots.map((hotspot) =>
          hotspot.id === draggingHotspotId
            ? {
                ...hotspot,
                position: { x: newPos.x, y: newPos.y - offsetY, z: newPos.z },
              }
            : hotspot
        )
      );
    }
  };

  return (
    <>
      <mesh onPointerMove={onPointerMove} scale={[-1, 1, 1]}>
        <sphereGeometry args={[R, 64, 64]} />
        <meshBasicMaterial side={1} map={texture} />
      </mesh>
      {selectedPanoramaHotspots.map((hotspot) => (
        <Hotspot r={R} key={hotspot.id} hotspot={hotspot} />
      ))}
    </>
  );
};

export { PanoramaCanvas };
