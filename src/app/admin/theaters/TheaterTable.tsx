"use client"
import React from 'react'
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
import { Theater } from '@/types';

interface TheaterTableProps {
    theaters: Theater[];
    onEdit: (theater: Theater) => void;
    onDelete: (theater: Theater) => void;
}

const TheaterTable = ({ theaters, onEdit, onDelete }: TheaterTableProps) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Amenidades</TableCell>
                    <TableCell>Capacidad</TableCell>
                    <TableCell>Filas</TableCell>
                    <TableCell>Asientos por fila</TableCell>
                    <TableCell>Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {theaters.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                            No hay salas registradas
                        </TableCell>
                    </TableRow>
                ) : (
                    theaters.map((theater) => (
                        <TableRow key={theater.id} hover>
                            <TableCell>{theater.name}</TableCell>
                            <TableCell>{theater.amenities.join(', ')}</TableCell>
                            <TableCell>{theater.capacity}</TableCell>
                            <TableCell>{theater.rows}</TableCell>
                            <TableCell>{theater.seatsPerRow}</TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        title="Editar"
                                        onClick={() => onEdit(theater)}
                                    >
                                        <Edit />
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        title="Eliminar"
                                        onClick={() => onDelete(theater)}
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
    )
}

export default TheaterTable