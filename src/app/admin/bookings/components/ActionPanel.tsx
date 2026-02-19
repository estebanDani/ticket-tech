import React from 'react'
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment, SelectChangeEvent } from '@mui/material'
import { Search } from '@mui/icons-material';
import { theme } from '@/theme/theme'

interface ActionPanelProps {
    filterDate: string;
    setFilterDate: (date: string) => void;
    filterStatus: string;
    setFilterStatus: (status: string) => void;
    filterMovie: string;
    setFilterMovie: (movie: string) => void;
}

const ActionPanel = ({
    filterDate,
    setFilterDate,
    filterStatus,
    setFilterStatus,
    filterMovie,
    setFilterMovie
}: ActionPanelProps) => {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#fff",
            padding: 2,
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            marginY: 3,
            gap: 2
        }}>
            <TextField
                label="Fecha de Reserva"
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ flex: 1, ...styles.inputText }}
            />
            <FormControl fullWidth sx={{ flex: 1, ...styles.inputText }}>
                <InputLabel id="status-select-label">Estado</InputLabel>
                <Select
                    labelId="status-select-label"
                    id="status-select"
                    value={filterStatus}
                    label="Estado"
                    onChange={(e: SelectChangeEvent) => setFilterStatus(e.target.value)}
                >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="pending">Pendiente</MenuItem>
                    <MenuItem value="confirmed">Confirmada</MenuItem>
                    <MenuItem value="cancelled">Cancelada</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Película"
                value={filterMovie}
                onChange={(e) => setFilterMovie(e.target.value)}
                sx={{ flex: 1, ...styles.inputText }}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search />
                            </InputAdornment>
                        )
                    }
                }}
            />
        </Box>
    )
}

export default ActionPanel

const styles = {
    inputText: {
        '& label': {
            color: 'rgba(0, 0, 0, 0.7)',
        },
        '& label.Mui-focused': {
            color: theme.palette.primary.main,
        },
    }
}