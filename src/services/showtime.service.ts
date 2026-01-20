import {collection, getDocs, getDoc, doc, addDoc, where, query, Timestamp} from 'firebase/firestore';
import { db } from '@/services/firebase';

import { CreateShowtimeDto, Showtime } from '@/types';
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
            })) as Showtime [];
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
                })) as Showtime [];

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

}
