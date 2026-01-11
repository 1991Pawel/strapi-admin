import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { useTexture } from '@react-three/drei';

const PanoramaCanvas = ({ src }: any) => {
  const texture = useTexture(src);
  return (
    <>
      <mesh>
        <sphereGeometry args={[50, 64, 64]} />
        <meshBasicMaterial side={2} map={texture} />
      </mesh>

      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={-0.35} />
    </>
  );
};
export { PanoramaCanvas };
