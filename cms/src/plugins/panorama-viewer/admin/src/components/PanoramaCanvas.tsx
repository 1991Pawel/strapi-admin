import { useTexture, Html, OrbitControls } from '@react-three/drei';
import { type EditorState, type StateSetter } from '../types';
import { useRef } from 'react';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
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

  const p = centerOnSphere(camera, R);

  return (
    <>
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[R, 64, 64]} />
        <meshBasicMaterial side={1} map={texture} />
      </mesh>

      {hotspots.map((hotspot) => (
        <Hotspot
          key={hotspot.id}
          position={{
            x: p.x,
            y: p.y,
            z: p.z,
          }}
          hotspot={hotspot}
        />
      ))}

      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={-0.35} target={[0, 0, -1]} />
    </>
  );
};

export { PanoramaCanvas };
