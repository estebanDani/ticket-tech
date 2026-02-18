import { Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

interface FormDeleteProps {
  handleDelete: () => void;
  title: string;
  submit: boolean;
}

export const ShowtimeDelete = ({ title, handleDelete, submit }: FormDeleteProps) => {
  return (
    <>
      <DialogTitle>Eliminar Función</DialogTitle>
      <DialogContent>
        <Typography>
          ¿Estás seguro de eliminar la función de <strong>{title}</strong>?
        </Typography>
        <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
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