import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTheme } from "../contexts/ThemeContext";
import { useEffect } from "react";

type IFilterProps = {
  setFilter: (filter: number | null) => void;
  filter: number | null;
};

export default function FilteringComponent({
  filter,
  setFilter,
}: IFilterProps) {
  const { theme } = useTheme();

  const { search } = window.location;

  useEffect(() => {
    const params = new URLSearchParams(search);
    const sortingId = params.get("sort");
    if (sortingId) {
      setFilter(parseInt(sortingId, 10));
    } else {
      setFilter(null);
    }
  }, [search]);

  const handleChange = (event: SelectChangeEvent) => {
    const params = new URLSearchParams(search);
    if (event.target.value !== "") {
      setFilter(parseInt(event.target.value, 10));
      params.set("sort", event.target.value.toString());
    } else {
      params.delete("sort");
    }
    window.location.search = params.toString();
  };

  return (
    <Box
      sx={{
        minWidth: 120,
        display: "flex",
        flexDirection: "row",
        justifyContent: "end",
        mr: "0.5rem",
        my: "1rem",
      }}
    >
      <FormControl sx={{ color: theme.secondaryColor }}>
        <InputLabel id="filter">Sortering</InputLabel>
        <Select
          labelId="filter"
          id="filterSelect"
          value={filter !== null ? filter.toString() : ""}
          label="Filter"
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="3">A-Ö</MenuItem>
          <MenuItem value="4">Ö-A</MenuItem>
          <MenuItem value="5">Pris lågt-högt</MenuItem>
          <MenuItem value="6">Pris högt-lågt</MenuItem>
          <MenuItem value="">Nollställ sortering</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
