import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { ADD_BOOK, GET_BOOKS, UPDATE_BOOK } from '../../api/constants';
import { sendRequest, sendUpdateRequest } from '../../api/utils';
import useSWRMutation from 'swr/mutation';
import { TableRowData } from '../../types';
import * as Yup from 'yup';
import { useSWRConfig } from 'swr';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  genre: Yup.string().required('Genre is required'),
  description: Yup.string().required('Description is required'),
});

interface CreateUpdateModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
  item?: TableRowData;
}

const CreateUpdateModal = (props: CreateUpdateModalProps) => {
  const { isOpen, onCloseModal, item } = props;
  const { trigger, isMutating } = useSWRMutation(ADD_BOOK, sendRequest);
  const { mutate } = useSWRConfig()
  
  const { trigger: triggerUpdate, isMutating: isUpdateMutating } =
    useSWRMutation(`${UPDATE_BOOK}/${item?.id}`, sendUpdateRequest);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: {
      title: item?.title || '',
      author: item?.author || '',
      genre: item?.genre || '',
      description: item?.description || '',
    },
    onSubmit: async (values) => {
      try {
        if(item) {
          await triggerUpdate(values)
          mutate(GET_BOOKS)
        } else {
          await trigger(values)
        }
        
        onCloseModal();
        formik.resetForm();
      } catch (error) {
        alert('Failed to add book.');
      }
    },
  });

  return (
    <Modal
      open={isOpen}
      onClose={onCloseModal}
      aria-labelledby='parent-modal-title'
      aria-describedby='parent-modal-description'
    >
      <Box sx={{ ...style, width: 400, height: 450 }}>
        <Typography
          variant='h1'
          my={3}
          sx={{ fontSize: '24px', fontWeight: 600 }}
        >
          {item ? `Edit book` : `Add new book`}
        </Typography>

        <TextField
          id='title'
          label='Title'
          variant='outlined'
          onChange={(e) => formik.setFieldValue('title', e.target.value)}
          value={formik.values.title}
          required
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          id='author'
          label='Author'
          variant='outlined'
          onChange={(e) => formik.setFieldValue('author', e.target.value)}
          value={formik.values.author}
          required
          error={formik.touched.author && Boolean(formik.errors.author)}
          helperText={formik.touched.author && formik.errors.author}
        />
        <TextField
          id='genre'
          label='Genre'
          variant='outlined'
          onChange={(e) => formik.setFieldValue('genre', e.target.value)}
          value={formik.values.genre}
          required
          error={formik.touched.genre && Boolean(formik.errors.genre)}
          helperText={formik.touched.genre && formik.errors.genre}
        />
        <TextField
          id='description'
          label='Description'
          variant='outlined'
          onChange={(e) => formik.setFieldValue('description', e.target.value)}
          value={formik.values.description}
          required
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />

        <Button
          onClick={() => formik.handleSubmit()}
          variant='contained'
          disabled={isMutating}
        >
          {isMutating || isUpdateMutating ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateUpdateModal;
