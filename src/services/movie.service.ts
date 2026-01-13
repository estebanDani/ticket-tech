import {collection, getDocs, getDoc, doc, addDoc,} from 'firebase/firestore';
import { db } from './firebase';
import { Movie } from '../types';


export class MovieService {
    
    static async getAll(): Promise<Movie[]> {
        try {
            const snapshot = await getDocs(collection(db, 'movies'));

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
            const docRef = doc(db, 'movies', id);
            const snapshot = await getDoc(docRef);

            if (!snapshot.exists()) {
                return null;
            }

            return {
                id: snapshot.id,
                ...snapshot.data(),
            } as Movie;
        } catch (error) {
            console.error(`Error getting movie ${id}:`, error);
            throw new Error('Failed to fetch movie');
        }
    }

    static async create(movie: Omit<Movie, 'id'>): Promise<Movie> {
        try {
            const docRef = await addDoc(
                collection(db, 'movies'),
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
