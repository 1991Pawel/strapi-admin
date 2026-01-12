import { useState } from 'react';
import { Main, Box } from '@strapi/design-system';
import { Settings } from '../components/Settings';
import { Viewer } from '../components/Viewer';
import { type EditorState } from '../types';
import { Hotspots } from '../components/Hotspots';
import { Button } from '@strapi/design-system';

const HomePage = () => {
  const [editorState, setEditorState] = useState<EditorState>({
    panoramas: [],
  });

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
            <Button onClick={() => console.log(editorState)}>Dodaj Link Hotspot</Button>
          </Box>
        </Box>
      </Box>
    </Main>
  );
};

export { HomePage };
