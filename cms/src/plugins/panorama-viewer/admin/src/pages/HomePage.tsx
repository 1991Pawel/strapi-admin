import { Main, Box, Button, Typography } from '@strapi/design-system';
import { Link } from 'react-router-dom';
import { useFetchClient } from '@strapi/strapi/admin';
import { useState, useEffect } from 'react';

interface Tour {
  id: string;
  documentId?: string;
  title: string;
  thumbnail: string;
}

const HomePage = () => {
  const { get } = useFetchClient();
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true);
        const response = await get('/panorama-viewer/tours');

        if (response.data?.data) {
          const toursData = response.data.data.map((tour: any) => {
            const editorState = tour.editorState || {};

            return {
              id: tour.documentId || tour.id,
              title: editorState.title || 'Untitled Tour',
              thumbnail: editorState.thumbnail || '',
            };
          });
          setTours(toursData);
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, [get]);

  return (
    <Main>
      <Box padding={8} marginTop={6}>
        {' '}
        <Button
          as={Link}
          to="/plugins/panorama-viewer/create-tour"
          variant="secondary"
          style={{ margin: 42, padding: 16 }}
        >
          Create New Panorama Tour
        </Button>
        <Box padding={8} background="neutral100" minHeight="100vh">
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '32px',
            }}
          >
            {isLoading ? (
              <Typography>Loading tours...</Typography>
            ) : (
              tours.map((tour: Tour) => (
              <Box
                key={tour.id}
                width="320px"
                height="320px"
                background="neutral0"
                shadow="tableShadow"
                overflow="hidden"
                borderRadius="10px"
              >
                <Box
                  height="220px"
                  style={{
                    backgroundImage: `url(${tour.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />

                <Box padding={4}>
                  <Typography variant="omega" fontWeight="bold">
                    {tour.title}
                  </Typography>
                </Box>
              </Box>
            ))
            )}
          </Box>
        </Box>
      </Box>
    </Main>
  );
};

export { HomePage };
