import  { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// eslint-disable-next-line react/prop-types
function Input({ LabelText, type = "text", sx }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <TextField
      id="outlined-basic"
      label={LabelText}
      variant="outlined"
      type={type === "password" && showPassword ? "text" : type}
      sx={{
        width: "100%",
        backgroundColor: "white",
        ...sx,
      }}
      InputProps={{
        endAdornment: type === "password" ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
}

export default Input;