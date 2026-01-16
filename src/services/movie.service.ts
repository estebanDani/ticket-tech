import {collection, getDocs, getDoc, doc, addDoc,} from 'firebase/firestore';

import { db } from '@/services/firebase';
import { Movie, CreateMovieDto } from '@/types';
import { COLLECTIONS } from '@/utils/constants';

export class MovieService {
    
    static async getAll(): Promise<Movie[]> {
        try {
            const snapshot = await getDocs(collection(db, COLLECTIONS.MOVIES));
            
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Movie [];
        } catch (error) {
            console.error('Error getting movies:', error);
            throw new Error('Failed to fetch movies');
        }
    }

    static async getById(id: string): Promise<Movie | null> {
        try {
            const docRef = doc(db, COLLECTIONS.MOVIES, id);
            const snapshot = await getDoc(docRef);
            
            if (!snapshot.exists()) {
                return null;
            }

            const data = snapshot.data()
            
            return {
                id: snapshot.id,
                ...data,
                releaseDate: data.releaseDate?.toDate(),
            } as Movie;
        } catch (error) {
            console.error(`Error getting movie ${id}:`, error);
            throw new Error('Failed to fetch movie');
        }
    }

    static async create(movie: CreateMovieDto): Promise<Movie> {
        try {
            const docRef = await addDoc(
                collection(db, COLLECTIONS.MOVIES),
                movie
            );

            return {
                id: docRef.id,
                ...movie,
            };
        } catch (error) {
            console.error('Error creating movie:', error);
            throw new Error('Failed to create movie');
        }
    }
}
