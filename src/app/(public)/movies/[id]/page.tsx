
import { MovieDetailClient } from './MovieDetailClient'


interface PageProps {
  params: Promise<{ id: string }>
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params
  return <MovieDetailClient id={id} />
}
