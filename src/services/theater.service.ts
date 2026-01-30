import { db } from "./firebase"
import { collection, getDocs, getDoc, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore"
import { Theater } from "@/types"
import { Seat } from "@/types"
import { COLLECTIONS } from "@/utils/constants"


const theatersCollection = collection(db, COLLECTIONS.THEATERS)

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
        const docRef = doc(db, COLLECTIONS.THEATERS, id)
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
const create = async (theater: Omit<Theater, 'id' | 'capacity' | 'seatMap'>): Promise<Theater> => {
    try {
        const seats = seatMapGenerator(theater.rows, theater.seatsPerRow)
        const capacity = seats.length

        const newTheater = {
            ...theater,
            capacity: capacity,
            seatMap: seats,
        }

        const docRef = await addDoc(theatersCollection, newTheater)

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
        const docRef = doc(db, COLLECTIONS.THEATERS, id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error("Theater not found");
        }

        const currentData = docSnap.data() as Theater;
        const updates = { ...theater };
        const hasRowChanged = updates.rows !== undefined && updates.rows !== currentData.rows;
        const hasSeatsChanged = updates.seatsPerRow !== undefined && updates.seatsPerRow !== currentData.seatsPerRow;

        if (hasRowChanged || hasSeatsChanged) {
            const newRows = updates.rows || currentData.rows;
            const newSeatsPerRow = updates.seatsPerRow || currentData.seatsPerRow;

            if (newRows <= 0 || newSeatsPerRow <= 0) {
                throw new Error("Rows and seats per row must be greater than 0");
            }
            const newSeatMap = seatMapGenerator(newRows, newSeatsPerRow);
            updates.seatMap = newSeatMap;
            updates.capacity = newSeatMap.length;
        }

        await updateDoc(docRef, updates);
    } catch (error) {
        console.error('Error updating theater:', error);
        throw error;
    }
};
const deleteTheater = async (id: string): Promise<void> => {
    try {
        const docRef = doc(db, COLLECTIONS.THEATERS, id);
        
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            throw new Error("Theater not found to delete");
        }

        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting theater:', error);
        throw error;
    }
};

export default {
    getAll: getAll,
    getById: getById,
    create: create,
    update: update,
    delete: deleteTheater
}

const seatMapGenerator = (rows: number, seatsPerRow: number): Seat[] => {
    const seats: Seat[] = [];
    for (let i = 0; i < rows; i++) {
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