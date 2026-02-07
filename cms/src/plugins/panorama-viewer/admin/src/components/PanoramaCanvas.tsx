import { useTexture } from '@react-three/drei';
import { Hotspot } from './Hotspot';
import { ThreeEvent } from '@react-three/fiber';
import {
  useActivePanoramaId,
  useDraggingHotspotId,
  useHotspots,
} from '../store/useStore';
import { dragPositionRef } from '../store/dragRef';

type PanoramaCanvasProps = {
  src: string;
};
const R = 50;

const PanoramaCanvas = ({ src }: PanoramaCanvasProps) => {
  const texture = useTexture(src);
  const activePanoramaId = useActivePanoramaId();
  const hotspots = useHotspots();
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
      dragPositionRef.x = newPos.x;
      dragPositionRef.y = newPos.y - offsetY;
      dragPositionRef.z = newPos.z;
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
