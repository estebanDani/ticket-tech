import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, where, query, Timestamp, orderBy, limit, getCountFromServer } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { CreateShowtimeDto, UpdateShowtimeDto, Showtime } from '@/types';
import { COLLECTIONS } from '@/utils/constants';

export class ShowtimeService {
static async getPaged(page: number, pageSize: number) {
    try {
        const colRef = collection(db, COLLECTIONS.SHOWTIMES);
                const countSnapshot = await getCountFromServer(colRef);
        const total = countSnapshot.data().count;

        const queryShowtime = query(
            colRef, 
            orderBy("startTime", "desc"),
            limit(page * pageSize) 
        );

        const snapshot = await getDocs(queryShowtime);
        
        const docs = snapshot.docs.slice((page - 1) * pageSize, page * pageSize);

        const results = docs.map((docSnapshot) => {
            const data = docSnapshot.data();
            return {
                id: docSnapshot.id,
                ...data,
                startTime: data.startTime?.toDate() || new Date(),
                endTime: data.endTime?.toDate() || new Date(),
            } as Showtime;
        });

        return { results, total };
    } catch (error) {
        throw new Error('Failed to fetch paged showtimes', { cause: error });
    }
}

    static async getAll(): Promise<Showtime[]> {
        try {
            const snapshot = await getDocs(collection(db, COLLECTIONS.SHOWTIMES));

            return snapshot.docs.map((docSnapshot) => {
                const data = docSnapshot.data();
                return {
                    id: docSnapshot.id,
                    ...data,
                    startTime: data.startTime?.toDate() || new Date(),
                    endTime: data.endTime?.toDate() || new Date(),
                } as Showtime;
            });
        } catch (error) {
            throw new Error('Failed to fetch showtimes', { cause: error });
        }
    }

    static async getById(id: string): Promise<Showtime | null> {
        try {
            const docRef = doc(db, COLLECTIONS.SHOWTIMES, id);
            const snapshot = await getDoc(docRef);

            if (!snapshot.exists()) {
                return null;
            }

            const data = snapshot.data();

            return {
                id: snapshot.id,
                ...data,
                startTime: data.startTime?.toDate() || new Date(),
                endTime: data.endTime?.toDate() || new Date(),
            } as Showtime;
        } catch (error) {
            throw new Error('Failed to fetch showtime', { cause: error });
        }
    }

    static async getByMovieId(movieId: string): Promise<Showtime[]> {
        try {
            const showtimeRef = query(
                collection(db, COLLECTIONS.SHOWTIMES),
                where("movieId", "==", movieId)
            );

            const querySnapshot = await getDocs(showtimeRef);

            return querySnapshot.docs.map((docSnapshot) => {
                const data = docSnapshot.data();
                return {
                    id: docSnapshot.id,
                    ...data,
                    startTime: data.startTime?.toDate() || new Date(),
                    endTime: data.endTime?.toDate() || new Date(),
                } as Showtime;
            });
        } catch (error) {
            throw new Error('Failed to fetch showtimes for movie', { cause: error });
        }
    }

    static async create(showtime: CreateShowtimeDto): Promise<Showtime> {
        try {
            const payload = {
                ...showtime,
                startTime: Timestamp.fromDate(new Date(showtime.startTime)),
                endTime: Timestamp.fromDate(new Date(showtime.endTime)),
            };

            const docRef = await addDoc(collection(db, COLLECTIONS.SHOWTIMES), payload);

            return {
                id: docRef.id,
                ...showtime,
            } as Showtime;

        } catch (error) {
            throw new Error('Failed to create showtime', { cause: error });
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
            return (data.reservedSeats as string[]) ?? [];

        } catch (error) {
            throw new Error('Failed to fetch reserved seats', { cause: error });
        }
    }

    static async update(id: string, showtime: UpdateShowtimeDto): Promise<void> {
        try {
            if (!id || id.trim() === '') {
                throw new Error('Invalid showtime ID');
            }
            
            const payload: Record<string, unknown> = { ...showtime };
            
            if (showtime.startTime) {
                payload.startTime = Timestamp.fromDate(new Date(showtime.startTime));
            }
            if (showtime.endTime) {
                payload.endTime = Timestamp.fromDate(new Date(showtime.endTime));
            }

            const docRef = doc(db, COLLECTIONS.SHOWTIMES, id);
            await updateDoc(docRef, payload);
        } catch (error) {
            throw new Error('Failed to update showtime', { cause: error });
        }
    }

    static async delete(id: string): Promise<void> {
        if (!id || id.trim() === '') {
            throw new Error('Invalid showtime ID');
        }

        const reservedSeats = await ShowtimeService.getReservedSeats(id);

        if (reservedSeats.length > 0) {
            throw new Error('No se puede eliminar: La función ya tiene asientos reservados.');
        }
        
        const docRef = doc(db, COLLECTIONS.SHOWTIMES, id);
        await deleteDoc(docRef);
    }
}