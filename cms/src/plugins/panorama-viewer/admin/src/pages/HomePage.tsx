import { useState } from 'react';
import { Main, Box } from '@strapi/design-system';
import { Settings } from '../components/Settings';
import { Viewer } from '../components/Viewer';
import { type EditorState } from '../types';
import { Button } from '@strapi/design-system';
import { useId } from 'react';

const HomePage = () => {
  const [editorState, setEditorState] = useState<EditorState>({
    panoramas: [],
    hotspots: [],
    draggingHotspotId: null,
    activePanoramaId: null,
  });

  const handleAddHotspot = () => {
    const newHotspot = {
      id: Date.now().toString(),
      panoramaId: editorState.activePanoramaId || 'default-panorama',
      type: 'link' as const,
      position: null,
    };

    setEditorState((prev: EditorState) => ({
      ...prev,
      hotspots: [...prev.hotspots, newHotspot],
    }));
  };

  return (
    <Main>
      <Box padding={6} style={{ width: '100%' }}>
        <Box
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: 16,
          }}
        >
          <Box style={{ background: 'red' }}>
            <Settings editorState={editorState} setEditorState={setEditorState} />
          </Box>
          <Box style={{ background: 'blue', position: 'relative' }}>
            <Viewer editorState={editorState} setEditorState={setEditorState} />
          </Box>
          <Box>
            <Button onClick={handleAddHotspot}>Dodaj Link Hotspot</Button>
          </Box>
        </Box>
      </Box>
    </Main>
  );
};

export { HomePage };
