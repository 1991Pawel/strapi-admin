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
    console.log('hotspot pointer down', e);
  };
  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    console.log('hotspot pointer up', e);
  };
  const hanldePointerMove = (e: any) => {
    e.stopPropagation();
    console.log('hotspot pointer move', e);
  };

  const handleDelete = (id: string) => {
    console.log('delete hotspot', id);
    setEditorState((prev: EditorState) => ({
      ...prev,
      hotspots: prev.hotspots.filter((hs) => hs.id !== id),
    }));
    console.log(hotspot);
  };

  return (
    <group position={[position.x, position.y, position.z]} key={hotspot.id}>
      <Billboard follow>
        <Html transform distanceFactor={100}>
          <div
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
            }}
          >
            <div
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerMove={hanldePointerMove}
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
