import { Main, Box, Button, Typography } from '@strapi/design-system';
import { Link } from 'react-router-dom';

const MOCK_TOURS = [
  {
    id: '1',
    title: 'Mieszkanie – salon',
    thumbnail:
      'http://localhost:1337/uploads/aerial_drone_panorama_view_village_located_near_river_hills_fields_godrays_clouds_moldova_ceeffea75d.jpg',
  },
  {
    id: '2',
    title: 'Biuro – open space',
    thumbnail:
      'http://localhost:1337/uploads/aerial_drone_panorama_view_village_located_near_river_hills_fields_godrays_clouds_moldova_ceeffea75d.jpg',
  },
];

const HomePage = () => {
  return (
    <Main>
      <Box padding={8} background="neutral100" minHeight="100vh">
        <Button
          as={Link}
          to="/plugins/panorama-viewer/create-tour"
          variant="secondary"
          style={{ marginTop: 16, paddingBottom: 24 }}
        >
          Create New Panorama Tour
        </Button>
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, 320px)" gap={6}>
          {MOCK_TOURS.map((tour) => (
            <Box
              key={tour.id}
              width="320px"
              height="320px"
              background="neutral0"
              shadow="tableShadow"
              overflow="hidden"
              borderRadius="10px"
            >
              {/* IMAGE */}
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
          ))}
        </Box>
      </Box>
    </Main>
  );
};

export { HomePage };
