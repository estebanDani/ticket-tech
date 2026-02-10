"use client";

import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

interface DeleteModalProps {
    open: boolean;
    title: string;
    itemName?: string;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting?: boolean;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
    open,
    title,
    itemName,
    onClose,
    onConfirm,
    isDeleting = false,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
        >
            <DialogTitle id="delete-dialog-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                🗑️ {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-dialog-description" sx={{ color: 'black' }}>
                    {itemName ? (
                        <div>
                            ¿Estás seguro de que deseas eliminar <strong>"{itemName}"</strong>?
                            <br />
                            <br />
                            Esta acción no se puede deshacer.
                        </div>
                    ) : (
                        <div>
                            ¿Estás seguro de que deseas eliminar este elemento?
                            <br />
                            <br />
                            Esta acción no se puede deshacer.
                        </div>
                    )}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isDeleting}>
                    Cancelar
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                    disabled={isDeleting}
                    autoFocus
                >
                    {isDeleting ? "Eliminando..." : "Eliminar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};