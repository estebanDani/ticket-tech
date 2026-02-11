import { Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"


interface FormDeleteProps {
  handleDelete: () => void
  title: string
  submit: boolean
}

export const TheaterFormDelete = ({ title, handleDelete, submit }: FormDeleteProps)=> {
  return (
    <>
        <DialogTitle>Eliminar película</DialogTitle>
        <DialogContent>
            <Typography>
            ¿Estás seguro de eliminar la{' '}
            <strong>{title}</strong>?
            </Typography>
        </DialogContent>

        <DialogActions>
            <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            disabled={submit}
            >
            Eliminar
            </Button>
        </DialogActions>
    </>
  )
}