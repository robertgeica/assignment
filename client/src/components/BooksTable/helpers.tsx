import * as Yup from 'yup';
import { Book, TableColumnData, TableRowData } from '../../types';
import { TableCell, TableRow } from '@mui/material';
import { columns } from './columns';

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

export const generateTableRows = (
  data: TableRowData[],
  rowActions: Function
) => {
  return data.map((row: TableRowData) => {
    const cellValues = [row.title, row.author, row.genre, row.description];
    return (
      <TableRow key={row.id}>
        {cellValues.map((value, index) => (
          <TableCell
            key={index}
            align={index === cellValues.length - 1 ? 'right' : 'left'}
          >
            {value}
          </TableCell>
        ))}
        {rowActions(row)}
      </TableRow>
    );
  });
};

export const generateTableColumns = () => {
  return columns.map((column: TableColumnData, index: number) => (
    <TableCell align={index === 0 ? 'left' : 'right'} key={column.label}>
      {column.label}
    </TableCell>
  ));
};
