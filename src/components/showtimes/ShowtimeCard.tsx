"use client";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Showtime } from "@/types";
import { useBooking } from "@/contexts/BookingContext";
import { useTheater } from "@/hooks/useTheater";
import Link from "next/link";

interface ShowtimeCardProps {
  showtime: Showtime;
}

export const ShowtimeCard = ({ showtime }: ShowtimeCardProps) => {
  const { theater } = useTheater(showtime.theaterId);
  const { setShowtime } = useBooking();

  const handleClick = () => {
    setShowtime(showtime);
  };

  return (
    <Card
      sx={{
        width: "100%",
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Box display="flex">
              <Typography variant="h6" fontWeight="bold">
                🕒
                {new Date(showtime.startTime).toLocaleTimeString("es-BO", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </Typography>
            </Box>

            <Box mt={1}>
              <Box display="flex">
                <Typography variant="body2">
                  🏢 {theater?.name ?? showtime.theaterId}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={2} mt={0.5}>
                <Typography variant="body2">
                  💺
                  {showtime.availableSeats}
                  Asientos Disponibles
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box textAlign="right">
            <Typography variant="h6" fontWeight="bold" color="primary">
              {showtime.price} Bs
            </Typography>

            <Button
              component={Link}
              href={`/booking/${showtime.id}/seats`}
              variant="contained"
              size="small"
              sx={{ mt: 1 }}
              onClick={() => setShowtime(showtime)}
            >
              Seleccionar
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
