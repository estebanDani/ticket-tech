import 'dotenv/config'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { generateMockShowtimes } from '@/mocks/mockShowtimes'

async function seedShowtimes() {
    console.log('🎬 Generando showtimes...')

    const showtimes = await generateMockShowtimes()
    const showtimesCollection = collection(db, 'showtimes')

    console.log(`💾 Guardando ${showtimes.length} showtimes...`)

    for (const showtime of showtimes) {
        await addDoc(showtimesCollection, {
            ...showtime,
            startTime: Timestamp.fromDate(showtime.startTime as Date),
            endTime: Timestamp.fromDate(showtime.endTime as Date),
        })
    }

    console.log('✅ Completado!')
}

seedShowtimes().catch(() => {
    process.exit(1)
})