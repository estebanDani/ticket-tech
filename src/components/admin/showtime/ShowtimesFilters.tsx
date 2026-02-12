"use client";

import { TextField, MenuItem } from "@mui/material";

type MovieMap = Record<string, string>;

interface Props {
  moviesfilter:MovieMap ;
  filters: {
    movieId: string;
    date: string;
  };
  onChange: (filters: { movieId: string; date: string }) => void;
}

export default function ShowtimesFilters({ moviesfilter,filters, onChange }: Props) {
  return (
    <>
      <TextField
        size="small"
        label="Película"
        select
        value={filters.movieId}
        onChange={(e) =>
          onChange({ ...filters, movieId: e.target.value })
        }
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="">Todas</MenuItem>
        {Object.entries(moviesfilter).map(([id, name]) => (
          <MenuItem key={id} value={id}>
          {name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        size="small"
        type="date"
        label="Fecha"
        InputLabelProps={{ shrink: true }}
        value={filters.date}
        onChange={(e) =>
          onChange({ ...filters, date: e.target.value })
        }
      />
    </>
  );
}
