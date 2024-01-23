import * as Yup from 'yup';
import { Book, TableRowData } from '../../types';

export const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  genre: Yup.string().required('Genre is required'),
  description: Yup.string().required('Description is required'),
});

export const initialValues = (item?: TableRowData): Book => ({
  title: item?.title || '',
  author: item?.author || '',
  genre: item?.genre || '',
  description: item?.description || '',
});
