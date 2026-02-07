import { useState } from 'react';
import { Main, Box, Button, Typography, Flex } from '@strapi/design-system';
import { Settings } from '../components/Settings';
import { Viewer } from '../components/Viewer';
import { useFetchClient } from '@strapi/strapi/admin';
import { TourDetailsModal } from '../components/TourDetailsModal';
import {
  usePanoramas,
  useActivePanoramaId,
  useHotspots,
  useSetHotspots,
  useResetStore,
} from '../store/useStore';

const CreateTourPage = () => {
  const { post } = useFetchClient();
  const panoramas = usePanoramas();
  const hotspots = useHotspots();
  const activePanoramaId = useActivePanoramaId();
  const reset = useResetStore();
  const setHotspots = useSetHotspots();
  const [isTourDetailsModalOpen, setIsTourDetailsModalOpen] = useState(false);

  const handleCloseTourDetailsModal = () => {
    setIsTourDetailsModalOpen(false);
  };

  const handleOpenTourDetailsModal = () => {
    setIsTourDetailsModalOpen(true);
  };

  const handleAddHotspot = () => {
    const newHotspot = {
      id: Date.now().toString(),
      panoramaId: activePanoramaId || 'default-panorama',
      type: 'link' as const,
      position: null,
    };

    setHotspots([...hotspots, newHotspot]);
  };

  async function saveTour() {
    try {
      const fd = new FormData();

      panoramas.forEach((p) => {
        fd.append('files', p.file, p.file.name);
      });

      const payload = {
        ...panoramas,
        panoramas: panoramas.map((p) => ({
          id: p.id,
          name: p.name,
          fileName: p.file.name,
        })),
      };

      fd.append('data', JSON.stringify(payload));

      const res = await post('/panorama-viewer/save-tour', fd);

      console.log('Saved', res.data);
    } catch (e) {
      console.error(e);
    } finally {
      clearTour();
    }
  }

  const clearTour = () => {
    reset();
    setIsTourDetailsModalOpen(false);
  };

  const showButtonToSaveTour = panoramas.length > 0 && hotspots.length > 0;
  const showButtonToAddHotspot = panoramas.length > 0;

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
          <Box background="neutral0" padding={6} shadow="tableShadow">
            <Box>
              <Settings />
              <Flex style={{ gap: 8, marginTop: 16 }}>
                {showButtonToAddHotspot && (
                  <Button onClick={handleAddHotspot} variant="tertiary">
                    Add Hotspot
                  </Button>
                )}
                {showButtonToSaveTour && (
                  <Button onClick={handleOpenTourDetailsModal} variant="success">
                    Save Tour
                  </Button>
                )}
              </Flex>
            </Box>
          </Box>

          <Box
            background="neutral0"
            padding={4}
            shadow="tableShadow"
            style={{ position: 'relative', minHeight: '600px' }}
          >
            <Viewer />
          </Box>
        </Box>
      </Box>
      <TourDetailsModal
        onSave={saveTour}
        onClose={handleCloseTourDetailsModal}
        open={isTourDetailsModalOpen}
      />
    </Main>
  );
};

export { CreateTourPage };
