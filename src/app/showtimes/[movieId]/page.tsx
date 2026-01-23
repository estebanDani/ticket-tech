import { ShowtimesPageClient } from "@/components/showtimes/ShowtimesPageClient";

type PageProps = {
  params: { movieId: string } | Promise<{ movieId: string }>;
};

export default async function ShowtimesPage({ params }: PageProps) {
  const { movieId } = await Promise.resolve(params);
  return <ShowtimesPageClient movieId={movieId} />;
}
