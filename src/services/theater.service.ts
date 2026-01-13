import { db } from "./firebase"
import { collection, getDocs, getDoc, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore"
import { Theater } from "@/types"
import { Seat } from "@/types"


const theatersCollection = collection(db, 'theaters')

const getAll = async (): Promise<Theater[]> => {
    try {
        const querySnapshot = await getDocs(theatersCollection)
        return querySnapshot.docs.map(doc => (
            {
                id: doc.id,
                ...doc.data()
            }
        )) as Theater[]
    } catch (error) {
        console.error('Error fetching theaters:', error)
        throw error
    }
}

const getById = async (id: string): Promise<Theater> => {
    try {
        const docRef = doc(db, 'theaters', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            } as Theater
        } else {
            throw new Error('Theater not found')
        }
    } catch (error) {
        console.error('Error fetching theater:', error)
        throw error
    }
}
const create = async (theater: Omit<Theater, 'id'>): Promise<Theater> => {
    try {
        const docRef = await addDoc(theatersCollection, theater)
        //Generamos el mapeo de los asientos
        const seats = seatMapGenerator(theater.rows, theater.seatsPerRow)
        //Calculamos la capacidad total
        const capacity = seats.length
        //Actualizamos el objeto theater con los datos generados
        const newTheater = {
            ...theater,
            capacity,
            seatMap: seats,
        }
        return {
            id: docRef.id,
            ...newTheater
        } as Theater
    } catch (error) {
        console.error('Error creating theater:', error)
        throw error
    }
}
const update = async (id: string, theater: Partial<Theater>): Promise<void> => {
    try {
        const docRef = doc(db, 'theaters', id);
        await updateDoc(docRef, theater);
    } catch (error) {
        console.error('Error updating theater:', error);
        throw error;
    }
};
const eliminate = async (id: string): Promise<void> => {
    try {
        const docRef = doc(db, 'theaters', id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting theater:', error);
        throw error;
    }
};

export {
    getAll,
    getById,
    create,
    update,
    eliminate
}

const seatMapGenerator = (rows: number, seatsPerRow: number): Seat[] => {
    const seats: Seat[] = [];
    for (let i = 0; i < rows; i++) {
        // Genera la letra de la fila (A, B, C...)
        const rowLabel = String.fromCharCode(65 + i);

        for (let j = 1; j < seatsPerRow; j++) {
            seats.push({
                id: `${rowLabel}${j}`,
                row: rowLabel,
                number: j,
                type: 'normal',
                position: { x: j, y: i }
            })
        }
    }
    return seats
}