import React from 'react'
interface ShotimesDetailsProps {
    params: {
        movieId: string
    }
}


const ShotimesDetails = async ({ params }: ShotimesDetailsProps) => {
    const { movieId } = await params
    return (
        <div>ShotimesDetails {movieId}</div>
    )
}

export default ShotimesDetails