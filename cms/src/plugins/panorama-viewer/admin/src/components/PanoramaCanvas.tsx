import { useTexture, Html, OrbitControls } from '@react-three/drei';
type PanoramaCanvasProps = {
  src: string;
};
const R = 50;

const PanoramaCanvas = ({ src }: PanoramaCanvasProps) => {
  const texture = useTexture(src);
  return (
    <>
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[R, 64, 64]} />
        <meshBasicMaterial side={1} map={texture} />
      </mesh>

      <group position={[0, 0, -R + 0.05]}>
        <Html transform center distanceFactor={100}>
          <div
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '2px solid rgba(0,0,0,0.35)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.stopPropagation();
                console.log('klik hotspot');
              }}
            />

            <div
              style={{
                marginTop: '10px',
                minWidth: '140px',
                background: 'rgba(20,20,20,0.92)',
                color: '#ffffff',
                borderRadius: '10px',
                padding: '10px',
                boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
                fontSize: '12px',
                userSelect: 'none',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  fontWeight: 700,
                  marginBottom: '8px',
                  fontSize: '12px',
                }}
              >
                Hotspot
              </div>

              <div
                style={{
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  marginBottom: '6px',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('edytuj hotspot');
                }}
              >
                ✏️ Edytuj
              </div>

              <div
                style={{
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid rgba(231,76,60,0.35)',
                  background: 'rgba(231,76,60,0.18)',
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('usuń hotspot');
                }}
              >
                🗑️ Usuń
              </div>
            </div>
          </div>
        </Html>
      </group>

      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={-0.35} target={[0, 0, -1]} />
    </>
  );
};

export { PanoramaCanvas };
