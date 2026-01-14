import 'dotenv/config'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { mockMovies } from '@/mocks/mockMovies'


async function seedMovies() {

  const moviesCollection = collection(db, 'movies')

  for (const movie of mockMovies) {
    const payload = {
      ...movie,
      releaseDate: Timestamp.fromDate(movie.releaseDate),
      createdAt: Timestamp.fromDate(movie.createdAt),
    }

    const ref = await addDoc(moviesCollection, payload)
  }
}

seedMovies().catch((err) => {
  process.exit(1)
})
