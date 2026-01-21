import { useState } from 'react';
import { Main, Box } from '@strapi/design-system';
import { Settings } from '../components/Settings';
import { Viewer } from '../components/Viewer';
import { type EditorState } from '../types';
import { Button } from '@strapi/design-system';

import { useFetchClient } from '@strapi/strapi/admin';

const initialState = {
  panoramas: [],
  hotspots: [],
  draggingHotspotId: null,
  activePanoramaId: null,
};

const HomePage = () => {
  const { post } = useFetchClient();
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

  async function saveTour() {
    try {
      const fd = new FormData();

      editorState.panoramas.forEach((p) => {
        fd.append('files', p.file, p.file.name);
      });

      const payload = {
        ...editorState,
        panoramas: editorState.panoramas.map((p) => ({
          id: p.id,
          name: p.name,
          fileName: p.file.name,
        })),
      };

      fd.append('data', JSON.stringify(payload));

      const res = await post('/panorama-viewer/save-tour', fd);
      clearTour();
      console.log('Saved', res.data);
    } catch (e) {
      console.error(e);
    }
  }

  const clearTour = () => {
    setEditorState(initialState);
  };

  const showButtonToSaveTour = editorState.panoramas.length > 0 && editorState.hotspots.length > 0;

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
            <Button
              onClick={saveTour}
              style={{
                marginTop: 16,
                backgroundColor: '#4CAF50',
                color: 'white',
              }}
            >
              Zapisz Tours
            </Button>
            <Button onClick={handleAddHotspot}>Dodaj Link Hotspot</Button>
            {showButtonToSaveTour && (
              <Button
                onClick={saveTour}
                style={{
                  marginTop: 16,
                  backgroundColor: '#4CAF50',
                  color: 'white',
                }}
              >
                Zapisz Tours
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Main>
  );
};

export { HomePage };
