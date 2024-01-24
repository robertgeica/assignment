import { useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BooksTableHeader from './BooksTableHeader';
import CreateUpdateModal from './CreateUpdateModal';
import { DELETE_BOOK, GET_BOOKS } from '../../api/constants';
import { fetcher, sendDeleteRequest } from '../../api/utils';
import { TableRowData } from '../../types';
import { generateTableColumns, generateTableRows } from './helpers';

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

  const DELETE_URL: string = `${DELETE_BOOK}/${item?.id}`;
  const { trigger, isMutating } = useSWRMutation(DELETE_URL, sendDeleteRequest);

  const tableColumns = generateTableColumns();

  const onDeleteClick = async (row: TableRowData): Promise<void> => {
    await setItem(row);
    await trigger();
    await mutate();
  };

  const rowActions = (row: TableRowData) => (
    <TableCell align='right'>
      <IconButton
        onClick={() => {
          setItem(row);
          onOpenModal();
        }}
      >
        <EditOutlinedIcon />
      </IconButton>
      <IconButton onClick={() => onDeleteClick(row)} disabled={isMutating}>
        <DeleteOutlinedIcon />
      </IconButton>
    </TableCell>
  );

  const tableRows =
    !isLoading &&
    !error &&
    data.length > 0 &&
    generateTableRows(data, rowActions);

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
