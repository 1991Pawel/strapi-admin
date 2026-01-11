import { Box, Button } from '@strapi/design-system';
import { useRef, useState } from 'react';

const Settings = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [panoramas, setPanoramas] = useState([]);

  console.log(panoramas, 'panoramas');

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
          setPanoramas(file as any);
        }}
        ref={fileInputRef}
        type="file"
        accept="image/jpeg"
        style={{ display: 'none' }}
      />
    </Box>
  );
};

export { Settings };
