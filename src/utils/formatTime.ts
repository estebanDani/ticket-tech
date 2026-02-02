export const formatTime = (date: Date | undefined) => {
    if (!date) return 'Hora no disponible';

    return date.toLocaleTimeString('es-BO', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};