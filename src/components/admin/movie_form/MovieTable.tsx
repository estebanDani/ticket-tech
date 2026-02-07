'use client';

import { useState } from 'react';
import {Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Button,ButtonGroup,Typography,Box,TablePagination, Tooltip} from '@mui/material';

import { CheckBox, Delete, Edit } from '@mui/icons-material';
import { Movie } from '@/types';
import { formatDuration } from '@/utils';

interface Props {
  movies: Movie[];
  onEdit: (movie: Movie) => void;
  onDelete: (movie: Movie) => void;
}

export default function MovieTable({ movies, onEdit, onDelete }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!movies.length) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>No hay películas registradas</Typography>
      </Box>
    );
  }

  const paginatedMovies = movies.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Género</TableCell>
              <TableCell align="center">Duración</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMovies.map((movie, index) => (
              <TableRow key={movie.id ?? index}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.genre.join(', ')}</TableCell>
                <TableCell align="center">
                  {formatDuration(movie.duration)}
                </TableCell>

                <TableCell align="center">
                    <Tooltip title={movie.isActive? 'Activo':'Inactivo'}>
                        <CheckBox color={movie.isActive? 'success':'disabled'} />
                    </Tooltip>
                </TableCell>

                <TableCell align="center">
                  <ButtonGroup variant="contained">
                    <Tooltip title="Editar">
                        <Button onClick={() => onEdit(movie)}>
                        <Edit />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <Button color="error" onClick={() => onDelete(movie)}>
                        <Delete />
                        </Button>
                    </Tooltip>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        labelRowsPerPage={'Cantidad por pagina'}
        count={movies.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </Paper>
  );
}
