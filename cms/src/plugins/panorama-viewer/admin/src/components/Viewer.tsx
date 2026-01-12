import { Box } from '@strapi/design-system';
import { PanoramaCanvas } from './PanoramaCanvas';
import { Canvas } from '@react-three/fiber';
import { type EditorState, type StateSetter } from '../types';

interface ViewerProps {
  setEditorState: StateSetter<EditorState>;
  editorState: EditorState;
}
const Viewer = ({ editorState, setEditorState }: ViewerProps) => {
  if (editorState.panoramas.length === 0) {
    return <Box>No panorama loaded</Box>;
  }
  const src = URL.createObjectURL(editorState.panoramas[0]);
  console.log(src);

  console.log('Rendering panorama viewer with src:', src);
  return (
    <Box padding={6} style={{ width: '100%' }}>
      <Canvas camera={{ fov: 75, position: [0, 0, 0.1] }}>
        <PanoramaCanvas src={src} />
      </Canvas>
      <h2>Lorem ipsum dolor sit amet.</h2>
    </Box>
  );
};

export { Viewer };
