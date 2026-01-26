import { useState } from 'react';
import { Html, Billboard } from '@react-three/drei';
import { type Hotspot as HotspotType } from '../types';
import type { ThreeEvent } from '@react-three/fiber';
import { type Camera, Vector3 } from 'three';
import { useThree } from '@react-three/fiber';
import {
  usePanoramas,
  useSetHotspots,
  useSetDraggingHotspotId,
  useRemoveHotspot,
  useHotspots,
} from '../store/useStore';

type HotspotProps = {
  hotspot: HotspotType;
  r: number;
};

const Hotspot = ({ hotspot, r }: HotspotProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const panoramas = usePanoramas();
  const setHotspots = useSetHotspots();
  const hotspots = useHotspots();
  const setDraggingHotspotId = useSetDraggingHotspotId();
  const removeHotspot = useRemoveHotspot();

  const centerOnSphere = (camera: Camera, R: number) => {
    const dir = camera.getWorldDirection(new Vector3()).normalize();
    return dir.multiplyScalar(R - 0.05);
  };
  const { camera } = useThree();
  const initialHotspotPosition = centerOnSphere(camera, R);

  const position = hotspot.position ?? {
    x: initialHotspotPosition.x,
    y: initialHotspotPosition.y,
    z: initialHotspotPosition.z,
  };

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();

    const target = e.target as HTMLElement;

    if (target?.setPointerCapture && e?.pointerId != null) {
      target.setPointerCapture(e.pointerId);
    }
    setDraggingHotspotId(hotspot.id);
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;

    if (target?.releasePointerCapture && e?.pointerId != null) {
      target.releasePointerCapture(e.pointerId);
    }

    setDraggingHotspotId(null);
  };

  const handleDelete = (id: string) => {
    removeHotspot(id);
  };

  return (
    <group position={[position.x, position.y, position.z]}>
      <Billboard key={hotspot.id} follow>
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
                maxWidth: '200px',
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
              {isEditing && (
                <>
                  <div
                    style={{
                      background: 'rgba(55,55,55,0.96)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.45)',
                      color: '#fff',
                      pointerEvents: 'auto',
                    }}
                  >
                    <div
                      style={{
                        padding: '10px 12px',
                        fontSize: '14px',
                        fontWeight: 600,
                        background: 'rgba(70,70,70,0.95)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>Wybierz panorame</span>
                      <span
                        onClick={(e) => {
                          setIsEditing(false);
                        }}
                        style={{ opacity: 0.7, cursor: 'pointer' }}
                      >
                        ✕
                      </span>
                    </div>

                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                      }}
                      onClick={(e) => {
                        const id = (e.target as HTMLElement).getAttribute('data-id');
                        if (!id) return;

                        setHotspots(
                          hotspots.map((h) =>
                            h.id === hotspot.id ? { ...h, targetPanoramaId: id } : h
                          )
                        );
                      }}
                    >
                      {panoramas.map((panorama) => (
                        <li
                          data-id={panorama.id}
                          key={panorama.id}
                          style={{
                            padding: '10px 12px',
                            fontSize: '13px',
                            borderTop: '1px solid rgba(255,255,255,0.08)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',

                            color:
                              panorama.id === hotspot.targetPanoramaId
                                ? '#4ade80'
                                : 'rgba(255,255,255,0.75)',
                            cursor: 'pointer',
                          }}
                        >
                          {panorama.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              <div
                style={{
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  marginBottom: '6px',
                  marginTop: '8px',
                  pointerEvents: 'auto',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing((prev) => !prev);
                }}
              >
                ✏️ edit
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
                🗑️ Remove
              </div>
            </div>
          </div>
        </Html>
      </Billboard>
    </group>
  );
};

export { Hotspot };
