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
  const handleDeletePanorama = (id: string) => {
    setEditorState((prev) => ({
      ...prev,
      panoramas: prev.panoramas.filter((p) => p.id !== id),

      activePanoramaId:
        prev.activePanoramaId === id && prev.panoramas.length > 1
          ? prev.panoramas.find((p) => p.id !== id)?.id || ''
          : prev.activePanoramaId,
    }));
    handleDeletedHotspotsForPanorama(id);
  };

  const handleDeletedHotspotsForPanorama = (id: string) => {
    setEditorState((prev) => ({
      ...prev,
      hotspots: prev.hotspots.filter((hotspot) => hotspot.panoramaId !== id),
    }));
  };

  const handleEditPanorama = (id: string) => {
    const panoramaToEdit = panoramas.find((p) => p.id === id);
    if (!panoramaToEdit) return;

    console.log('Editing panorama with id:', panoramaToEdit);
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
            handleDeletePanorama={handleDeletePanorama}
            handleEditPanorama={handleEditPanorama}
            panorama={panorama}
            activePanoramaId={activePanoramaId}
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
  handleDeletePanorama,
  handleEditPanorama,
}: {
  panorama: PanoramaFile;
  activePanoramaId: string;
  handleActivePanorama: (id: string) => void;
  handleDeletePanorama: (id: string) => void;
  handleEditPanorama: (id: string) => void;
}) => {
  const { file, id } = panorama;

  return (
    <Box>
      <Box>{file.name}</Box>
      <Button onClick={() => handleDeletePanorama(id)} variant="danger" style={{ marginTop: 8 }}>
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

      <Button
        onClick={() => handleEditPanorama(id)}
        variant="tertiary"
        style={{ marginTop: 8, marginLeft: 8 }}
      >
        edit
      </Button>
    </Box>
  );
};

export { Settings };
