import { Box, Button } from '@strapi/design-system';
import { useRef } from 'react';
import { type EditorState, StateSetter } from '../types';

interface SettingsProps {
  setEditorState: StateSetter<EditorState>;
  editorState: EditorState;
}

const Settings = ({ setEditorState, editorState }: SettingsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { panoramas } = editorState;

  return (
    <Box padding={6} style={{ width: '100%', flexDirection: 'column', display: 'flex' }}>
      Settings
      <Button
        onClick={() => {
          fileInputRef.current?.click();
        }}
        variant="secondary"
        style={{ marginTop: 16 }}
      >
        Upload Panorama
      </Button>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setEditorState((prev) => ({
            ...prev,
            panoramas: [...prev.panoramas, file],
          }));
        }}
        ref={fileInputRef}
        type="file"
        accept="image/jpeg"
        style={{ display: 'none' }}
      />
      <Box style={{ marginTop: 16 }}>
        {panoramas.map((p: File, index: number) => (
          <Box key={index}>{p.name}</Box>
        ))}
      </Box>
    </Box>
  );
};

export { Settings };
