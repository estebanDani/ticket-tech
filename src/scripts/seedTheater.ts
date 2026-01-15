import 'dotenv/config'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { mockTheaters } from '@/mocks/mockTheater'

async function seedTheaters() {
  const theatersCollection = collection(db, 'theaters')

  for (const theater of mockTheaters) {
    await addDoc(theatersCollection, theater)
  }
}

seedTheaters().catch(() => {
  process.exit(1)
})
