import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import CreateUpdateModal from './CreateUpdateModal';

const BooksTableHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpenModal = (): void => setIsOpen(true);
  const onCloseModal = (): void => setIsOpen(false);

  return (
    <>
      <Box my={2} sx={{ alignSelf: 'flex-end' }}>
        <Button variant='contained' endIcon={<AddIcon />} onClick={onOpenModal}>
          Add a new book
        </Button>
      </Box>
      <CreateUpdateModal isOpen={isOpen} onCloseModal={onCloseModal} />
    </>
  );
};

export default BooksTableHeader;
