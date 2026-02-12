'use client'
import { useMemo, useState } from "react";
import { Button, Box, LinearProgress, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TablePagination, Paper } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

interface Props {
  showtimes: any[];
  onEdit: (showtime: any) => void;
  onDelete: (showtime: any) => void;
}

export function ShowtimesTable({ showtimes, onEdit, onDelete }: Props) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedShowtimes = useMemo(() => {
    return showtimes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [page, rowsPerPage, showtimes]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Película</TableCell>
              <TableCell>Sala</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Ocupación</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedShowtimes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  No hay funciones registradas
                </TableCell>
              </TableRow>
            ) : (
              paginatedShowtimes.map((showtime) => (
                <TableRow key={showtime.id} hover>
                  <TableCell>{showtime.movieName}</TableCell>
                  <TableCell>{showtime.theaterName}</TableCell>
                  <TableCell>{showtime.date}</TableCell>
                  <TableCell>
                    {new Date(showtime.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </TableCell>
                  <TableCell>Bs {showtime.price}</TableCell>
                  <TableCell>
                    {(() => {
                      const total = showtime.availableSeats + (showtime.reservedSeats?.length || 0);
                      const occupied = showtime.reservedSeats?.length || 0;
                      const percentage = total ? (occupied / total) * 100 : 0;
                      return (
                        <Box sx={{ minWidth: 100 }}>
                          <LinearProgress variant="determinate" value={percentage} sx={{ height: 8, borderRadius: 5 }} />
                          <Typography variant="caption">{occupied} / {total}</Typography>
                        </Box>
                      );
                    })()}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Button variant="outlined" size="small" onClick={() => onEdit(showtime)}>
                        <Edit fontSize="small" />
                      </Button>
                      <Button variant="outlined" color="error" size="small" onClick={() => onDelete(showtime)}>
                        <Delete fontSize="small" />
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
        count={showtimes.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
        labelRowsPerPage="Filas por página"
      />
    </Paper>
  );
}