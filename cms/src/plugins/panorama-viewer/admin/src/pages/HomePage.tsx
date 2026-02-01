import { Main, Box, Button } from '@strapi/design-system';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Main>
      <Box padding={8} background="neutral100" minHeight="100vh">
        <Button
          as={Link}
          to="/plugins/panorama-viewer/create-tour"
          variant="secondary"
          style={{ marginBottom: 24, padding: '12px 24px' }}
        >
          Create New Panorama Tour
        </Button>
      </Box>
    </Main>
  );
};

export { HomePage };
