import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function FilteringComponent() {
  const [filter, setFilter] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="filter">Filter</InputLabel>
        <Select
          labelId="filterSelect"
          id="filterSelect"
          value={filter}
          label="Filter"
          onChange={handleChange}
        >
          <MenuItem value={3}>A-Ö</MenuItem>
          <MenuItem value={4}>Ö-A</MenuItem>
          <MenuItem value={5}>Pris högt-lågt</MenuItem>
          <MenuItem value={6}>Pris lågt-högt</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
