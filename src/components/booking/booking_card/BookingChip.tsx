'use client'
import { useMemo } from "react";
import { Chip } from "@mui/material";
import { theme } from "@/theme/theme";

interface ChipProps {
    status: string;
}

export const BookingChip = ({ status }: ChipProps) => {
    const statusInfo = () => {
        switch (status) {
            case 'pending':
                return {
                    label: 'Pendiente',
                    color: theme.palette.warning.light,
                    backgroundColor: theme.palette.warning.dark
                };
            case 'confirmed':
                return {
                    label: 'Confirmada',
                    color: theme.palette.success.light,
                    backgroundColor: theme.palette.success.dark
                };
            case 'cancelled':
                return {
                    label: 'Cancelada',
                    color: theme.palette.error.light,
                    backgroundColor: theme.palette.error.dark
                };
            default:
                return {
                    label: 'Desconocido',
                    color: theme.palette.grey[500],
                    backgroundColor: theme.palette.grey[800]
                };
        }
    };
    const statusMemo = useMemo(() => statusInfo(), [status]);
    return (
        <Chip
            label={statusMemo.label}
            sx={{
                width: 120,
                backgroundColor: statusMemo.backgroundColor,
                color: statusMemo.color
            }}
        />
    )
}
