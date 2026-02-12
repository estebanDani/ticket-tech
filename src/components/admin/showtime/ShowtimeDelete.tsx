import { Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

interface FormDeleteProps {
  handleDelete: () => void;
  movieName: string;
  date: string;
  submit: boolean;
}

export const ShowtimeDelete = ({ movieName, date, handleDelete, submit }: FormDeleteProps) => {
  return (
    <>
      <DialogTitle>Eliminar Función</DialogTitle>
      <DialogContent>
        <Typography>
          ¿Estás seguro de eliminar la función de <strong>{movieName}</strong> programada para el día <strong>{date}</strong>?
        </Typography>
        <Typography variant="caption" color="error">
          Esta acción no se puede deshacer.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          color="error"
          variant="contained"
          onClick={handleDelete}
          disabled={submit}
        >
          {submit ? "Eliminando..." : "Eliminar Función"}
        </Button>
      </DialogActions>
    </>
  );
};