import { useEffect, useMemo, useState } from 'react';
import { Modal, Button, TextInput, Box } from '@strapi/design-system';

type Props = {
  open: boolean;
  onClose: () => void;
  onSave?: (data: { title: string; thumbnail: File | null }) => void;
};

const TourDetailsModal = ({ open, onClose, onSave }: Props) => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const previewUrl = useMemo(
    () => (thumbnail ? URL.createObjectURL(thumbnail) : null),
    [thumbnail]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSave = () => {
    onSave?.({ title: title.trim(), thumbnail });
    onClose();
    setTitle('');
    setThumbnail(null);
  };

  const buttonDisabled = !title.trim() || !thumbnail;

  return (
    <Modal.Root
      open={open}
      onOpenChange={(isOpen: boolean) => {
        if (!isOpen) onClose();
      }}
    >
      <Modal.Content labelledBy="tour-details-modal" style={{ zIndex: 9999 }}>
        <Modal.Header>
          <Modal.Title id="tour-details-modal">Tour details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Box paddingBottom={4}>
            <TextInput
              label="Tour title"
              name="title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              required
            />
          </Box>

          <Box>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)}
            />

            {previewUrl && (
              <Box marginTop={2}>
                <img
                  src={previewUrl}
                  alt="thumbnail"
                  style={{ maxWidth: 200, maxHeight: 120, objectFit: 'cover' }}
                />
              </Box>
            )}
          </Box>
        </Modal.Body>

        <Modal.Footer>
          <Modal.Close>
            <Button variant="tertiary">Cancel</Button>
          </Modal.Close>
          <Button onClick={handleSave} disabled={buttonDisabled}>
            Save
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
};

export { TourDetailsModal };
