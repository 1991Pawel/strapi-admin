// Hotspot.tsx
import { Html, Billboard } from '@react-three/drei';
import { type Hotspot as HotspotType, EditorState, StateSetter } from '../types';

type HotspotProps = {
  hotspot: HotspotType;
  position: { x: number; y: number; z: number };
  setEditorState: StateSetter<EditorState>;
};

const Hotspot = ({ position, hotspot, setEditorState }: HotspotProps) => {
  const handlePointerDown = (e: any) => {
    e.stopPropagation();

    if (e?.target?.setPointerCapture && e?.pointerId != null) {
      e.target.setPointerCapture(e.pointerId);
    }

    setEditorState((prev) => ({ ...prev, draggingHotspotId: hotspot.id }));
  };

  const handlePointerUp = (e: any) => {
    e.stopPropagation();

    if (e?.target?.releasePointerCapture && e?.pointerId != null) {
      e.target.releasePointerCapture(e.pointerId);
    }

    setEditorState((prev) => ({ ...prev, draggingHotspotId: null }));
  };

  const handleDelete = (id: string) => {
    setEditorState((prev: EditorState) => ({
      ...prev,
      hotspots: prev.hotspots.filter((h) => h.id !== id),
    }));
  };

  return (
    <group position={[position.x, position.y, position.z]} key={hotspot.id}>
      <Billboard follow>
        <mesh onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} position={[0, 16, 1]}>
          <sphereGeometry args={[5, 24, 24]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        <Html pointerEvents="none" transform distanceFactor={100}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#15ac5cff',
                border: '2px solid rgba(0,0,0,0.35)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
                cursor: 'grab',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                lineHeight: 1,
                color: 'rgba(0,0,0,0.6)',
                userSelect: 'none',
              }}
            >
              ↔
            </div>

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
              <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '12px' }}>Hotspot</div>

              <div
                style={{
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  marginBottom: '6px',
                  pointerEvents: 'auto',
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
                  pointerEvents: 'auto',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(hotspot.id);
                }}
              >
                🗑️ Usuń
              </div>
            </div>
          </div>
        </Html>
      </Billboard>
    </group>
  );
};

export { Hotspot };
