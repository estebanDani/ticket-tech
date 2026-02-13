import React from 'react'
import { Container, Box, Grid, Card, CardMedia, Stack, Divider, Typography, Skeleton } from '@mui/material'
export const SkeletonMovieDetail = () => {
    return (
        <Container maxWidth={false} sx={{ py: 4, width: '100%' }}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            overflow: 'hidden',
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        <CardMedia
                            component="img"
                            sx={{ objectFit: 'cover', height: { xs: 420, md: 520 } }}
                        />
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="h4" fontWeight={800} gutterBottom>
                                <Skeleton variant="text" width={200} height={40} />
                            </Typography>

                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                <Skeleton variant="text" width={70} height={40} sx={{ borderRadius: 2 }} />
                                <Skeleton variant="text" width={70} height={40} sx={{ borderRadius: 2 }} />
                                <Skeleton variant="text" width={70} height={40} sx={{ borderRadius: 2 }} />
                            </Stack>
                        </Box>

                        <Divider />

                        <Box sx={{ maxWidth: 700 }}>
                            <Skeleton variant="text" width={200} height={60} />
                            <br />
                            <Skeleton variant="text" width={500} height={40} />
                            <Skeleton variant="text" width={500} height={40} />
                            <Skeleton variant="text" width={500} height={40} />
                        </Box>

                        <Box>
                            <Skeleton variant="text" width={80} height={40} />

                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                <Skeleton variant="text" width={70} height={40} sx={{ borderRadius: 2 }} />
                                <Skeleton variant="text" width={70} height={40} sx={{ borderRadius: 2 }} />
                                <Skeleton variant="text" width={70} height={40} sx={{ borderRadius: 2 }} />
                            </Stack>
                            <Skeleton variant="text" width={300} height={80} />
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}
