"use client";

import React, { useMemo, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Box,
    TablePagination,
    Typography,
    TableContainer,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Movie } from '@/types';

interface MovieTableProps {
    movies: Movie[];
    onEdit: (movie: Movie) => void;
    onDelete: (movie: Movie) => void;
}

export const MovieTable: React.FC<MovieTableProps> = ({
    movies,
    onEdit,
    onDelete,
}) => {

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
        ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

  const paginatedMovies = useMemo(()=>{
    return movies.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    )},[page,rowsPerPage,movies])
      
      
  if (!movies.length) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>No hay películas registradas</Typography>
      </Box>
    );
  }
    return (
        <>
            <TableContainer sx={{maxHeight: 'calc(100vh - 300px)',overflow: 'auto'}}>
                <Table sx={{maxWidth: 'auto'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Título</TableCell>
                            <TableCell>Duración</TableCell>
                            <TableCell>Género</TableCell>
                            <TableCell>Clasificación</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedMovies.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                                    No hay películas registradas
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedMovies.map((movie) => (
                                <TableRow key={movie.id} hover>
                                    <TableCell>{movie.title}</TableCell>
                                    <TableCell>{movie.duration} min</TableCell>
                                    <TableCell>
                                        {Array.isArray(movie.genre)
                                            ? movie.genre.join(', ')
                                            : movie.genre}
                                    </TableCell>
                                    <TableCell>{movie.rating}</TableCell>
                                    <TableCell>
                                        <Box
                                            component="span"
                                            sx={{
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: 1,
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                bgcolor: movie.isActive ? 'success.main' : 'grey.500',
                                                color: 'white',
                                            }}
                                        >
                                            {movie.isActive ? 'Activa' : 'Inactiva'}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                title="Editar"
                                                onClick={() => onEdit(movie)}
                                            >
                                                <Edit />
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                title="Eliminar"
                                                onClick={() => onDelete(movie)}
                                            >
                                                <Delete />
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
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
        </>
    );
};