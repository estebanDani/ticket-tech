'use client'
import { useMemo, useState } from "react";
import { Button, Box, LinearProgress, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TablePagination } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

interface EnrichedShowtime {
  id: string;
  movieId: string;
  theaterId: string;
  startTime: Date;
  endTime: Date;
  price: number;
  availableSeats: number;
  reservedSeats: string[];
  date: string;
  movieName: string;
  theaterName: string;
}

interface Props {
  showtimes: EnrichedShowtime[];
}

export function ShowtimesTable({ showtimes }: Props) {
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

  const paginatedShowtimes = useMemo(()=>{
    return showtimes.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    )
  },[page,rowsPerPage,showtimes])

  return (
    <>
      <TableContainer sx={{maxHeight: 'calc(100vh - 300px)',overflow: 'auto'}}>
        <Table sx={{maxWidth: 'auto'}}>
          <TableHead>
            <TableRow>
              <TableCell>Pélicula</TableCell>
              <TableCell>Sala</TableCell>
              <TableCell>Fecha Estreno</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Ocupación Asientos</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedShowtimes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  No hay salas registradas
                </TableCell>
              </TableRow>
            ) : (
              paginatedShowtimes.map((showtime) => (
                <TableRow key={showtime.id} hover>
                  <TableCell>{showtime.movieName}</TableCell>
                  <TableCell>{showtime.theaterName}</TableCell>
                  <TableCell>{showtime.date}</TableCell>
                  <TableCell>{(()=>{
                    const date = new Date(showtime.startTime);
                    return (date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"}))
                  })()}
                  </TableCell>
                  <TableCell>Bs {showtime.price}</TableCell>
                  <TableCell>
                    {(() => {
                      const total = showtime.availableSeats + showtime.reservedSeats.length;
                      const occupied = showtime.reservedSeats.length;
                      const percentage = total ? (occupied / total) * 100 : 0;
                      return (
                        <Box sx={{ width: "100%", mt: 2 }} alignItems="center">
                          <LinearProgress
                            variant="determinate"
                            value={percentage}
                            sx={{ mb: 0, height: 15 }}
                          />
                          <Typography align="center">{occupied} / {total}</Typography>
                        </Box>
                      );
                    })()}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        title="Editar"
                        onClick={() =>{}}
                      >
                        <Edit />
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        title="Eliminar"
                        onClick={() => {}}
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
        count={showtimes.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </>
  );
}
