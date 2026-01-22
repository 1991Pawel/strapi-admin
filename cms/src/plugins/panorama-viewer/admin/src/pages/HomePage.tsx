import { useState } from 'react';
import { Main, Box, Button, Typography, Flex } from '@strapi/design-system';
import { Settings } from '../components/Settings';
import { Viewer } from '../components/Viewer';
import { type EditorState } from '../types';
import { useFetchClient } from '@strapi/strapi/admin';

const initialState: EditorState = {
  panoramas: [],
  hotspots: [],
  draggingHotspotId: null,
  activePanoramaId: null,
};

const HomePage = () => {
  const { post } = useFetchClient();
  const [editorState, setEditorState] = useState<EditorState>(initialState);

  const handleAddHotspot = () => {
    const newHotspot = {
      id: Date.now().toString(),
      panoramaId: editorState.activePanoramaId || 'default-panorama',
      type: 'link' as const,
      position: null,
    };

    setEditorState((prev) => ({
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
      <Box padding={8} background="neutral100" minHeight="100vh">
        <Typography
          style={{
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '40px',
            paddingBottom: '20px',
            display: 'block',
            color: 'var(--strapi-color-neutral800)',
          }}
          variant="alpha"
        >
          Panorama Tour Editor
        </Typography>

        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: '330px 1fr',
            gap: '12px',
          }}
        >
          <Box background="neutral0" padding={6} shadow="tableShadow" hasRadius>
            <Typography variant="beta" marginBottom={4}>
              Panorama List
            </Typography>
            <Settings editorState={editorState} setEditorState={setEditorState} />
          </Box>

          <Box
            background="neutral0"
            padding={4}
            shadow="tableShadow"
            hasRadius
            style={{ position: 'relative', minHeight: '600px' }}
          >
            <Viewer editorState={editorState} setEditorState={setEditorState} />
          </Box>
        </Box>

        <Flex marginTop={6} gap={4} justifyContent="flex-end">
          <Button variant="secondary" onClick={handleAddHotspot}>
            Add Hotspot
          </Button>

          {showButtonToSaveTour && (
            <Button variant="success" onClick={saveTour}>
              Save Tour
            </Button>
          )}
        </Flex>
      </Box>
    </Main>
  );
};

export { HomePage };
