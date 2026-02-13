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
import { BookingWithDetails, Booking } from '@/types';

interface BookingsTableProps {
    bookings: BookingWithDetails[];
    onEdit: (booking: Booking) => void;
    onDelete: (booking: Booking) => void;
}

export const BookingsTable: React.FC<BookingsTableProps> = ({
    bookings,
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

    const paginatedBookings = useMemo(() => {
        return bookings.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        )
    }, [page, rowsPerPage, bookings])


    if (!bookings.length) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography>No hay reservas registradas</Typography>
            </Box>
        );
    }
    return (
        <>
            <TableContainer sx={{maxHeight: 'calc(100vh - 300px)',overflow: 'auto'}}>

                <Table sx={{maxWidth: 'auto'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Usuario</TableCell>
                            <TableCell>Pelicula</TableCell>
                            <TableCell>Metodo de pago</TableCell>
                            <TableCell>Asientos reservados</TableCell>
                            <TableCell>Sala</TableCell>
                            <TableCell>Precio total</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedBookings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                                    No hay películas registradas
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedBookings.map((booking) => (
                                <TableRow key={booking.id} hover>
                                    <TableCell>{booking.user}</TableCell>
                                    <TableCell>{booking.movie}</TableCell>
                                    <TableCell>{booking.paymentMethod}</TableCell>
                                    <TableCell>{booking.seats.join(', ')}</TableCell>
                                    <TableCell>{booking.theater}</TableCell>
                                    <TableCell>{booking.totalPreice}</TableCell>
                                    <TableCell>
                                        {booking.status}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                title="Editar"
                                                onClick={() => onEdit(booking)}
                                            >
                                                <Edit />
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                title="Eliminar"
                                                onClick={() => onDelete(booking)}
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
                count={bookings.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 15]}
            />
        </>
    );
};