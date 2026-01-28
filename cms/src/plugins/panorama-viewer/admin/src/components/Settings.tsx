import { Box, Button } from '@strapi/design-system';
import { useRef } from 'react';
import { type PanoramaFile } from '../types';
import { v4 as uuidv4 } from 'uuid';
import {
  usePanoramas,
  useActivePanoramaId,
  useSetPanoramas,
  useSetActivePanoramaId,
} from '../store/useStore';

const Settings = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const panoramas = usePanoramas();
  const activePanoramaId = useActivePanoramaId();
  const setActivePanoramaId = useSetActivePanoramaId();
  const setPanoramas = useSetPanoramas();

  const handleActivePanorama = (id: string) => {
    setActivePanoramaId(id);
  };

  const handleAddPanoramaFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newFile = {
      id: uuidv4(),
      file,
      name: file.name,
    };

    handleActivePanorama(newFile.id);
    setPanoramas([...panoramas, newFile]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeletePanorama = (id: string) => {
    setPanoramas(panoramas.filter((p) => p.id !== id));
  };

  const handleEditPanorama = (id: string) => {
    const panorama = panoramas.find((p) => p.id === id);
    if (!panorama) return;

    const newName = prompt('Enter new name for panorama', panorama.name);
    if (newName) {
      setPanoramas(panoramas.map((p) => (p.id === id ? { ...p, name: newName } : p)));
    }
  };

  return (
    <Box style={{ width: '100%', flexDirection: 'column', display: 'flex', height: '100%' }}>
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
  activePanoramaId: string | null;
  handleActivePanorama: (id: string) => void;
  handleDeletePanorama: (id: string) => void;
  handleEditPanorama: (id: string) => void;
}) => {
  const { file, id, name } = panorama;

  return (
    <Box>
      <Box
        style={{
          marginBottom: 8,
        }}
      >
        {name}
      </Box>
      <Box style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <Button onClick={() => handleDeletePanorama(id)} variant="danger" style={{ width: '100%' }}>
          🗑️
        </Button>

        <Button onClick={() => handleEditPanorama(id)} variant="tertiary" style={{ width: '100%' }}>
          ✏️ Edit
        </Button>
        {id !== activePanoramaId && (
          <Button
            onClick={() => handleActivePanorama(id)}
            variant="tertiary"
            style={{ width: '100%' }}
          >
            Active ✅
          </Button>
        )}
      </Box>
    </Box>
  );
};

export { Settings };
