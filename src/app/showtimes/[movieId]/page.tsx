import { Box, Container } from "@mui/material"
interface ShotimesDetailsProps {
    params: Promise<{ movieId: string }>
}


const ShotimesDetails = async ({ params }: ShotimesDetailsProps) => {
    const { movieId } = await params
    return (
        <Container>
            ShotimesDetails {movieId}
        </Container>
    )
}

export default ShotimesDetails