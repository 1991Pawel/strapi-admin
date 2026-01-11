import { useState } from 'react';
import { Main, Box } from '@strapi/design-system';
import { Settings } from '../components/Settings';
import { Viewer } from '../components/Viewer';

type EditorState = {
  panoramas: any;
  activePanoramaId?: string;
};

const HomePage = () => {
  const [editorState, setEditorState] = useState<EditorState>({
    panoramas: [],
  });

  console.log(editorState, 'editorState');

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
          <Box style={{ background: 'blue' }}>
            <Viewer editorState={editorState} setEditorState={setEditorState} />
          </Box>
        </Box>
      </Box>
    </Main>
  );
};

export { HomePage };
