import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, where, query, Timestamp } from 'firebase/firestore';
import { db } from '@/services/firebase';

import { CreateShowtimeDto, UpdateShowtimeDto, Showtime } from '@/types';
import { COLLECTIONS } from '@/utils/constants';

export class ShowtimeService {

    static async getAll(): Promise<Showtime[]> {
        try {
            const snapshot = await getDocs(collection(db, COLLECTIONS.SHOWTIMES));

            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                startTime: doc.data().startTime.toDate(),
                endTime: doc.data().endTime.toDate(),
            })) as Showtime[];
        } catch (error) {
            console.error('Error getting showtimes:', error);
            throw new Error('Failed to fetch showtimes');
        }
    }



    static async getById(id: string): Promise<Showtime | null> {
        try {
            const docRef = doc(db, COLLECTIONS.SHOWTIMES, id);
            const snapshot = await getDoc(docRef);

            if (!snapshot.exists()) {
                return null;
            }

            const data = snapshot.data()

            return {
                id: snapshot.id,
                ...data,
                startTime: data.startTime.toDate(),
                endTime: data.endTime.toDate(),
            } as Showtime;
        } catch (error) {
            console.error(`Error getting showtime ${id}:`, error);
            throw new Error('Failed to fetch showtime');
        }
    }

    static async getByMovieId(movieId: string): Promise<Showtime[]> {
        try {
            const showtimeRef = query(
                collection(db, COLLECTIONS.SHOWTIMES),
                where("movieId", "==", movieId));

            const querySnapshot = await getDocs(showtimeRef);

            const showtimes = querySnapshot.docs
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    startTime: doc.data().startTime.toDate(),
                    endTime: doc.data().endTime.toDate(),
                })) as Showtime[];

            return showtimes;
        } catch (error) {
            console.error(`Error getting showtimes for movie ${movieId}:`, error);
            throw new Error('Failed to fetch showtimes for movie');
        }
    }


    static async create(showtime: CreateShowtimeDto): Promise<Showtime> {
        try {
            const payload = {
                ...showtime,
                startTime: Timestamp.fromDate(showtime.startTime),
                endTime: Timestamp.fromDate(showtime.endTime),
            };

            const docRef = await addDoc(collection(db, COLLECTIONS.SHOWTIMES),
                payload
            );

            return {
                id: docRef.id,
                ...showtime,
            } as Showtime;

        } catch (error) {
            console.error('Error creating showtime:', error);
            throw new Error('Failed to create showtime');
        }
    }

    static async getReservedSeats(showtimeId: string): Promise<string[]> {
        try {
            const docRef = doc(db, COLLECTIONS.SHOWTIMES, showtimeId);
            const snapshot = await getDoc(docRef);

            if (!snapshot.exists()) {
                throw new Error('Showtime not found');
            }
            const data = snapshot.data();
            return data.reservedSeats ?? [];

        } catch (error) {
            console.error(`Error getting reserved seats for showtime ${showtimeId}:`, error);
            throw new Error('Failed to fetch reserved seats');
        }
    }

    static async update(id: string, showtime: UpdateShowtimeDto): Promise<void> {
        try {
            if (!id || id.trim() == '') {
                throw new Error('Invalid showtime ID');
            }
            if (!showtime || Object.keys(showtime).length == 0) {
                throw new Error('Invalid showtime data');
            }

            const docRef = doc(db, COLLECTIONS.SHOWTIMES, id);
            await updateDoc(docRef, showtime);
        } catch (error) {
            console.error(`Error updating showtime:`, error);
            throw new Error('Failed to update showtime');
        }
    }

    static async delete(id: string): Promise<void> {
        try {
            if (!id || id.trim() == '') {
                throw new Error('Invalid showtime ID');
            }

            const hasReservedSeats = await ShowtimeService.getReservedSeats(id);

            if (hasReservedSeats.length > 0) {
                throw new Error('Showtime has reserved seats');
                return;
            }
            const docRef = doc(db, COLLECTIONS.SHOWTIMES, id);
            await deleteDoc(docRef);

        } catch (error) {
            console.error(`Error deleting showtime ${id}:`, error);
            throw new Error('Failed to delete showtime');
        }
    }

}
