import { Card, CardContent, Typography, Box } from '@mui/material'
import React from 'react'

interface DataCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
}

export const DataCard = ({ title, value, icon, color }: DataCardProps) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ backgroundColor: color, padding: 1, borderRadius: "25%" }}>
                        {icon}
                    </Box>
                    <Typography variant="h4" gutterBottom={false}>
                        {value}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}
