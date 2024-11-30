/* eslint-disable react/prop-types */
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useEffect, useState } from "react";
import axios from "axios";
import APILINK from "../../../../Constants";

function RolesDropdown({ roleId = "", onChange }) {
  const [roles, setRoles] = useState([]);

  const getAllRoles = async () => {
    try {
      const response = await axios.get(`${APILINK}/api/Account/roles`);
      setRoles(response.data);
    } catch (err) {
      console.error("Failed to fetch roles:", err);
    }
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel>Role</InputLabel>
      <Select
        name="role"
        value={roleId} // The `id` of the selected role
        onChange={(e) => onChange(e.target.value)} // Pass the roleId to the parent
        label="Role"
        sx={{ backgroundColor: "white",
          
        }}
      >
        {roles.map((role) => (
          <MenuItem key={role.id} value={role.id}>
            {role.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default RolesDropdown;
