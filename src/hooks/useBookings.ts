import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { BookingService, BookingWithDetails } from '@/services/booking.service';
import { Booking } from '@/types';

export const useBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<BookingWithDetails[] | Booking []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user) return;

            try {
                setLoading(true);
                if(user.role === 'user'){

                    const data = await BookingService.getByUser(user.uid);
                    
                    const sortedData = data.sort((a, b) => {
                        const dateA = a.showtime?.startTime ? new Date(a.showtime.startTime).getTime() : 0;
                        const dateB = b.showtime?.startTime ? new Date(b.showtime.startTime).getTime() : 0;
                        return dateB - dateA;
                    });
                    setBookings(sortedData);
                }else{
                    const data = await BookingService.getAll();
                    
                    setBookings(data.data);
                }

            } catch (err) {
                console.error("Error fetching bookings:", err);
                setError('Error al cargar las reservas');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    return { bookings, loading, error };
};