import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

import { db } from '@/services/firebase';
import { Movie, CreateMovieDto, UpdateMovieDto } from '@/types';
import { COLLECTIONS } from '@/utils/constants';

export class MovieService {

    static async getAll(): Promise<Movie[]> {
        try {
            const snapshot = await getDocs(collection(db, COLLECTIONS.MOVIES));

            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Movie[];
        } catch (error) {
            throw new Error('Failed to fetch movies');
        }
    }
    static async getActive(): Promise<Movie[]> {
        const movies = await MovieService.getAll()
        return movies.filter((movie) => movie.isActive)
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
            throw new Error('Failed to create movie');
        }
    }
    static async update(id: string, movie: UpdateMovieDto): Promise<void> {
        try {
            if (!id || id.trim() == '') {
                throw new Error('Invalid movie ID');
            }

            if (!movie || Object.keys(movie).length == 0) {
                throw new Error('Invalid movie data');
            }

            const docRef = doc(db, COLLECTIONS.MOVIES, id);
            await updateDoc(docRef, movie);
        } catch (error) {
            console.log(error);
            throw new Error('Failed to update movie');
        }
    }
    static async delete(id: string): Promise<void> {
        try {
            if (!id || id.trim() == '') {
                throw new Error('Invalid movie ID');
            }
            const docRef = doc(db, COLLECTIONS.MOVIES, id);
            await deleteDoc(docRef);
        } catch (error) {
            throw new Error('Failed to delete movie');
        }
    }

}
