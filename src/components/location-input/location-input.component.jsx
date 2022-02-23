import TextField from "@mui/material/TextField";

const LocationInput = ({ errorMessage, onChange, value, disabled }) => {
  if (typeof value !== "string") {
    throw new Error("the value of LocationInput must be a string");
  }
  if (typeof onChange !== "function") {
    throw new Error("onChange property of LocationInput must be a function");
  }

  const extraAttributes = errorMessage
    ? {
        error: true,
        helperText: errorMessage,
      }
    : {};

  return (
    <TextField
      fullWidth={true}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      label="Location"
      {...extraAttributes}
    />
  );
};

export default LocationInput;
