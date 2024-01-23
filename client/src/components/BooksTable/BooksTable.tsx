import useSWR from 'swr';
import { DELETE_BOOK, GET_BOOKS } from '../../api/constants';
import { fetcher, sendDeleteRequest } from '../../api/utils';
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { columns } from './columns';
import { TableColumnData, TableRowData } from '../../types';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BooksTableHeader from './BooksTableHeader';
import { useState } from 'react';
import CreateUpdateModal from './CreateUpdateModal';
import useSWRMutation from 'swr/mutation';

const BooksTable = () => {
  const [item, setItem] = useState<TableRowData>({
    id: 0,
    title: '',
    author: '',
    description: '',
    genre: '',
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpenModal = (): void => setIsOpen(true);
  const onCloseModal = (): void => setIsOpen(false);

  const { data, error, isLoading, mutate } = useSWR(GET_BOOKS, fetcher);

  const { trigger, isMutating } = useSWRMutation(
    `${DELETE_BOOK}/${item?.id}`,
    sendDeleteRequest
  );

  const tableColumns = columns.map((column: TableColumnData, index: number) => (
    <TableCell align={index === 0 ? 'left' : 'right'} key={column.label}>
      {column.label}
    </TableCell>
  ));

  const tableRows =
    !isLoading &&
    !error &&
    data.length > 0 &&
    data.map((row: TableRowData) => (
      <TableRow key={row.id}>
        <TableCell>{row.title}</TableCell>
        <TableCell align='right'>{row.author}</TableCell>
        <TableCell align='right'>{row.genre}</TableCell>
        <TableCell align='right'>{row.description}</TableCell>
        <TableCell align='right'>
          <IconButton
            onClick={() => {
              setItem(row);
              onOpenModal();
            }}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={async () => {
              await setItem(row);
              await trigger();
              await mutate();
            }}
            disabled={isMutating}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ));

  if (error) {
    return (
      <Box>
        <Typography>Something went wrong.</Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <BooksTableHeader />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>{tableColumns}</TableRow>
          </TableHead>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </TableContainer>

      <CreateUpdateModal
        isOpen={isOpen}
        onCloseModal={onCloseModal}
        item={item}
      />
    </>
  );
};

export default BooksTable;
