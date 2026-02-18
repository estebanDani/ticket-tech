import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { BookingService } from "@/services";
import { BookingWithDetails } from "@/types";

type UseBookingsOptions = {
  onlyCurrentUser?: boolean;
};

export const useBookings = ({ onlyCurrentUser = false }: UseBookingsOptions = {}) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    if (!user) return;

    try {
      setLoading(true);
      let data;

      if (onlyCurrentUser) {
        data = await BookingService.getByUser(user.uid);

        const sortedData = data.sort((a, b) => {
          const dateA = a.showtime?.startTime ? new Date(a.showtime.startTime).getTime() : 0;
          const dateB = b.showtime?.startTime ? new Date(b.showtime.startTime).getTime() : 0;
          return dateB - dateA;
        });
        setBookings(sortedData);
      } else {
        data = await BookingService.getAll();
        setBookings(data.data);
      }

    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError('Error al cargar las reservas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user, onlyCurrentUser]);

  return { bookings, loading, error, refetch: fetchBookings };
};
