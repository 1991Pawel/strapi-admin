import { Box } from '@strapi/design-system';
import { PanoramaCanvas } from './PanoramaCanvas';
import { Canvas } from '@react-three/fiber';
import { type EditorState, type StateSetter } from '../types';
import { useMemo } from 'react';
import { OrbitControls } from '@react-three/drei';

type ViewerProps = {
  setEditorState: StateSetter<EditorState>;
  editorState: EditorState;
};

const Viewer = ({ editorState, setEditorState }: ViewerProps) => {
  if (editorState.panoramas.length === 0) {
    return <Box>No panorama loaded</Box>;
  }

  const blockRotate = editorState.draggingHotspotId !== null;

  const fileSrc = useMemo(() => {
    const file = editorState.panoramas[0];
    const src = URL.createObjectURL(file);
    return src;
  }, [editorState.panoramas]);

  return (
    <Box padding={6} style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ fov: 75, position: [0, 0, 0] }}>
        <PanoramaCanvas src={fileSrc} editorState={editorState} setEditorState={setEditorState} />
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
