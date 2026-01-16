import { Box, Button } from '@strapi/design-system';
import { useRef } from 'react';
import { type EditorState, PanoramaFile, StateSetter } from '../types';

type SettingsProps = {
  setEditorState: StateSetter<EditorState>;
  editorState: EditorState;
};

const Settings = ({ setEditorState, editorState }: SettingsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { panoramas, activePanoramaId } = editorState;

  console.log('activePanoramaId:', activePanoramaId);

  const handleAddPanoramaFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newFile = {
      id: Date.now().toString(),
      file,
    };
    setEditorState((prev) => ({
      ...prev,
      panoramas: [...prev.panoramas, newFile],
      activePanoramaId: newFile.id,
    }));
  };

  const handleActivePanorama = (id: string) => {
    console.log('Setting active panorama to:', id);
    setEditorState((prev) => ({
      ...prev,
      activePanoramaId: id,
    }));
  };

  return (
    <Box
      padding={6}
      style={{ width: '100%', flexDirection: 'column', display: 'flex', minHeight: '400px' }}
    >
      Settings
      <Button
        onClick={() => {
          fileInputRef.current?.click();
        }}
        variant="secondary"
        style={{ marginTop: 16 }}
      >
        Upload Panoramas
      </Button>
      <input
        onChange={handleAddPanoramaFile}
        ref={fileInputRef}
        type="file"
        accept="image/jpeg"
        style={{ display: 'none' }}
      />
      <Box style={{ marginTop: 16 }}>
        {panoramas.map((panorama) => (
          <PanoramaTile
            handleActivePanorama={handleActivePanorama}
            panorama={panorama}
            activePanoramaId={activePanoramaId}
            // handleActivePanorama={() => handleActivePanorama(panorama.id)}
            key={panorama.id}
            {...panorama}
          />
        ))}
      </Box>
    </Box>
  );
};

const PanoramaTile = ({
  panorama,
  activePanoramaId,
  handleActivePanorama,
}: {
  panorama: PanoramaFile;
  activePanoramaId: string;
  handleActivePanorama: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}) => {
  const { file, id } = panorama;

  console.log(id, 'ID');
  console.log(activePanoramaId, 'ACTIVE ID');

  return (
    <Box>
      <Box>{file.name}</Box>
      <Button variant="danger" style={{ marginTop: 8 }}>
        Delete
      </Button>
      {id !== activePanoramaId && (
        <Box>
          {' '}
          <Button
            onClick={() => handleActivePanorama(id)}
            variant="tertiary"
            style={{ marginTop: 8, marginLeft: 8 }}
          >
            Set as Active
          </Button>{' '}
        </Box>
      )}

      <Button variant="tertiary" style={{ marginTop: 8, marginLeft: 8 }}>
        Rename
      </Button>
    </Box>
  );
};

export { Settings };
