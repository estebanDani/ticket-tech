export const formatDateWithYear = (date: Date | undefined) => {
    if (!date) return 'Fecha no disponible';

    return date.toLocaleDateString('es-BO', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};