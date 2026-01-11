import { Box, Button } from '@strapi/design-system';
import { useRef, useState } from 'react';

const Settings = ({ setEditorState, editorState: { panoramas } }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        onChange={(e) => {
          const file = e.target.files?.[0];

          setEditorState((prev: any) => ({
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
        {panoramas.map((p: any, index: number) => (
          <Box key={index}>{p.name}</Box>
        ))}
      </Box>
    </Box>
  );
};

export { Settings };
