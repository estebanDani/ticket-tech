import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Movie, Showtime } from '@/types';

interface BookingContextType {
  selectedMovie: Movie | null;
  selectedShowtime: Showtime | null;
  selectedSeats: string[];
  
  setMovie: (movie: Movie | null) => void;
  setShowtime: (showtime: Showtime | null) => void;
  setSeats: (seats: string[]) => void;
  
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const setMovie = (movie: Movie | null) => {
    setSelectedMovie(movie);
    setSelectedShowtime(null);
    setSelectedSeats([]);
  };

  const setShowtime = (showtime: Showtime | null) => {
    setSelectedShowtime(showtime);
    setSelectedSeats([]);
  };

  const setSeats = (seats: string[]) => {
    setSelectedSeats(seats);
  };

  const clearBooking = () => {
    setSelectedMovie(null);
    setSelectedShowtime(null);
    setSelectedSeats([]);
  };

  const value: BookingContextType = {
    selectedMovie,
    selectedShowtime,
    selectedSeats,
    setMovie,
    setShowtime,
    setSeats,
    clearBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking debe ser usado dentro de un BookingProvider');
  }
  return context;
};