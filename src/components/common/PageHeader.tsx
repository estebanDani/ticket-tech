import React from 'react'
import { Box, Typography } from '@mui/material'

interface PageHeaderProps {
    title: string;
    description: string;
    icon: string;
}

const PageHeader = ({ title, description, icon }: PageHeaderProps) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ backgroundColor: 'primary.main', borderRadius: 1, p: 1, fontSize: '2rem' }}>
                {icon}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4">{title}</Typography>
                <Typography variant='body1'>{description}</Typography>
            </Box>
        </Box>
    )
}

export default PageHeader