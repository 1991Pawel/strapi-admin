import { Box } from '@strapi/design-system';
import { PanoramaCanvas } from './PanoramaCanvas';
import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import { OrbitControls } from '@react-three/drei';
import { usePanoramas, useActivePanoramaId, useDraggingHotspotId } from '../store/useStore';

const Viewer = () => {
  const panoramas = usePanoramas();
  const activePanoramaId = useActivePanoramaId();
  const draggingHotspotId = useDraggingHotspotId();

  const fileSrc = useMemo(() => {
    const file = panoramas.find((p) => p.id === activePanoramaId)?.file;
    if (!file) return '';
    const src = URL.createObjectURL(file);
    return src;
  }, [panoramas, activePanoramaId]);

  if (panoramas.length === 0) {
    return <Box padding={6}>add Panorama</Box>;
  }
  const blockRotate = draggingHotspotId !== null;

  return (
    <Box padding={6} style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ fov: 75, position: [0, 0, 0] }}>
        <PanoramaCanvas src={fileSrc} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={!blockRotate}
          target={[0, 0, -1]}
        />
      </Canvas>
    </Box>
  );
};

export { Viewer };
