import { Modal, Box, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";

interface QrModalProps {
    open: boolean;
    onClose: () => void;
    qrCode: string;
    idReserva: string;
}

export const QrModal = ({ open, onClose, qrCode, idReserva }: QrModalProps) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={styles.modal}>
                <Typography variant="h6" component="h2" fontWeight={700}>
                    Código QR de reserva
                </Typography>
                <QRCodeSVG value={qrCode} size={256} />
                <Typography variant="caption" component="p" fontWeight={700}>
                    #{idReserva}
                </Typography>
            </Box>
        </Modal>
    )
}
const styles = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2
    }
}