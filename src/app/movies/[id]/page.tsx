import { collection, getDocs } from 'firebase/firestore'

import { db } from '@/services/firebase'
import { MovieDetailClient } from './MovieDetailClient'

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  try {
    const moviesSnapshot = await getDocs(collection(db, 'movies'))

    return moviesSnapshot.docs.map((doc) => ({
      id: doc.id,
    }))
  } catch (error) {
    console.error('Error fetching movies for static generation:', error)
    return [{ id: '1' }]
  }
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params

  return <MovieDetailClient id={id} />
}