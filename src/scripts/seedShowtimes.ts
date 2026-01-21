import 'dotenv/config'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { generateMockShowtimes } from '@/mocks/mockShowtimes'

async function seedShowtimes() {

    const showtimes = await generateMockShowtimes()
    const showtimesCollection = collection(db, 'showtimes')

    for (const showtime of showtimes) {
        await addDoc(showtimesCollection, {
            ...showtime,
            startTime: Timestamp.fromDate(showtime.startTime as Date),
            endTime: Timestamp.fromDate(showtime.endTime as Date),
        })
    }
}

seedShowtimes().catch(() => {
    process.exit(1)
})