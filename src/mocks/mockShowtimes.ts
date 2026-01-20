import type { Showtime } from '@/types'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/services/firebase'

interface Movie {
    id: string
    duration: number
    isActive: boolean
}

interface Theater {
    id: string
    capacity: number
}

const HOURS = [14, 17, 20, 23]
const MIN_PRICE = 50
const MAX_PRICE = 80

const generateTimestamp = (daysFromNow: number, hour: number): Date => {
    const date = new Date()
    date.setDate(date.getDate() + daysFromNow)
    date.setHours(hour, 0, 0, 0)
    return date
}

const calculateEndTime = (startTime: Date, durationMinutes: number): Date => {
    const endTime = new Date(startTime)
    endTime.setMinutes(endTime.getMinutes() + durationMinutes)
    return endTime
}

const generatePrice = (): number => {
    return Math.floor(Math.random() * (MAX_PRICE - MIN_PRICE + 1)) + MIN_PRICE
}

const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0]
}

const getRandomHours = (): number[] => {
    const count = Math.floor(Math.random() * 2) + 3
    return [...HOURS].sort(() => Math.random() - 0.5).slice(0, count)
}

export const generateMockShowtimes = async (): Promise<Array<Omit<Showtime, 'id'>>> => {
    // Obtener movies activas
    const moviesSnapshot = await getDocs(collection(db, 'movies'))
    const movies: Movie[] = []
    moviesSnapshot.forEach((doc) => {
        const data = doc.data()
        if (data.isActive) {
            movies.push({
                id: doc.id,
                duration: data.duration,
                isActive: data.isActive,
            })
        }
    })

    // Obtener theaters
    const theatersSnapshot = await getDocs(collection(db, 'theaters'))
    const theaters: Theater[] = []
    theatersSnapshot.forEach((doc) => {
        const data = doc.data()
        theaters.push({
            id: doc.id,
            capacity: data.capacity,
        })
    })

    if (movies.length === 0 || theaters.length === 0) {
        throw new Error('No hay películas activas o salas en la base de datos')
    }

    const showtimes: Array<Omit<Showtime, 'id'>> = []

    // Generar para 14 días
    for (let day = 0; day < 14; day++) {
        for (const movie of movies) {
            const hours = getRandomHours()

            for (const hour of hours) {
                const theater = theaters[Math.floor(Math.random() * theaters.length)]
                const startTime = generateTimestamp(day, hour)
                const endTime = calculateEndTime(startTime, movie.duration)

                showtimes.push({
                    movieId: movie.id,
                    theaterId: theater.id,
                    startTime,
                    endTime,
                    price: generatePrice(),
                    availableSeats: theater.capacity,
                    reservedSeats: [],
                    date: formatDate(startTime),
                })
            }
        }
    }

    return showtimes
}