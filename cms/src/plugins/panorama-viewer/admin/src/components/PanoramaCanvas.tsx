import { useTexture, Html, OrbitControls } from '@react-three/drei';
type PanoramaCanvasProps = {
  src: string;
};

const PanoramaCanvas = ({ src }: PanoramaCanvasProps) => {
  const texture = useTexture(src);
  return (
    <>
      <mesh>
        <sphereGeometry args={[50, 64, 64]} />
        <meshBasicMaterial side={2} map={texture} />
      </mesh>
      {/* statyczne hotspoty (na sztywno) */}
      <mesh position={[0, 0, 0]}>
        <Html center distanceFactor={10}>
          <div className="label">Mój element HTML</div>
        </Html>
      </mesh>
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        rotateSpeed={-0.35}
        target={[0, 0, -1]}
      />
    </>
  );
};

export { PanoramaCanvas };
