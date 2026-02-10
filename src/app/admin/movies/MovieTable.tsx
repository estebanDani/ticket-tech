"use client";

import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Box,
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
    return (
        <Table>
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
                {movies.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                            No hay películas registradas
                        </TableCell>
                    </TableRow>
                ) : (
                    movies.map((movie) => (
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
    );
};