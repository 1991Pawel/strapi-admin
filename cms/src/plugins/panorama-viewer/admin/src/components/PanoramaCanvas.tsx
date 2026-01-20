import { useTexture, Html, OrbitControls } from '@react-three/drei';
import { type EditorState, type StateSetter } from '../types';
import { useRef } from 'react';
import { Vector3 } from 'three';
import { Hotspot } from './Hotspot';
import { useThree } from '@react-three/fiber';

const centerOnSphere = (camera: any, R: number) => {
  const dir = camera.getWorldDirection(new Vector3()).normalize();
  return dir.multiplyScalar(R - 0.05);
};
type PanoramaCanvasProps = {
  setEditorState: StateSetter<EditorState>;
  editorState: EditorState;
  src: string;
};
const R = 50;

const PanoramaCanvas = ({ setEditorState, editorState, src }: PanoramaCanvasProps) => {
  const texture = useTexture(src);
  const hotspots = editorState.hotspots;
  const { camera } = useThree();

  const initalHotspotPosition = centerOnSphere(camera, R);
  const selectedPanoramaHotspots = hotspots.filter(
    (hotspot) => hotspot.panoramaId === editorState.activePanoramaId
  );

  const onPointerMove = (e: any) => {
    if (editorState.draggingHotspotId !== null) {
      e.stopPropagation();
      console.log('canvas pointer move');
      console.log('e.point', e.point);
      const dir = e.point.clone().normalize();
      const newPos = dir.multiplyScalar(R - 0.5);
      // hidden mesh is y=16 above the hotspot position
      const offsetY = 16;

      setEditorState((prev) => ({
        ...prev,
        hotspots: prev.hotspots.map((hotspot) =>
          hotspot.id === prev.draggingHotspotId
            ? {
                ...hotspot,
                position: { x: newPos.x, y: newPos.y - offsetY, z: newPos.z },
              }
            : hotspot
        ),
      }));
    }
  };

  return (
    <>
      <mesh onPointerMove={onPointerMove} scale={[-1, 1, 1]}>
        <sphereGeometry args={[R, 64, 64]} />
        <meshBasicMaterial side={1} map={texture} />
      </mesh>

      {selectedPanoramaHotspots.map((hotspot) => (
        <Hotspot
          editorState={editorState}
          setEditorState={setEditorState}
          key={hotspot.id}
          position={{
            x: hotspot.position ? hotspot.position.x : initalHotspotPosition.x,
            y: hotspot.position ? hotspot.position.y : initalHotspotPosition.y,
            z: hotspot.position ? hotspot.position.z : initalHotspotPosition.z,
          }}
          hotspot={hotspot}
        />
      ))}
    </>
  );
};

export { PanoramaCanvas };
