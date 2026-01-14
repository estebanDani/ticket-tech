import 'dotenv/config'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { mockMovies } from '@/mocks/mockMovies'


async function seedMovies() {
  console.log('Seeding movies...')

  const moviesCollection = collection(db, 'movies')

  for (const movie of mockMovies) {
    const payload = {
      ...movie,
      releaseDate: Timestamp.fromDate(movie.releaseDate),
      createdAt: Timestamp.fromDate(movie.createdAt),
    }

    const ref = await addDoc(moviesCollection, payload)
    console.log(`Created movie: ${movie.title} (${ref.id})`)
  }

  console.log('Seed completed')
}

seedMovies().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
