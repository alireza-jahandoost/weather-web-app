import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import styled from "styled-components";
import { MobileDatePicker } from "@mui/lab";
import { formatDate } from "../../utilities";
import ErrorContainer from "../error-container/error-container.component";

const DatePickerComponent = ({
  errorMessage,
  value,
  onChange,
  disabled = false,
}) => {
  if (!/\d{4}\-\d{2}\-\d{2}/.test(value)) {
    throw new Error(
      "the value of DatePickerComponent must be in format yyyy-MM-dd"
    );
  }
  if (typeof onChange !== "function") {
    throw new Error(
      "onChange property of DatePickerComponent must be a function"
    );
  }

  const maxDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  const minDate = new Date(Date.now() - 50 * 365 * 24 * 60 * 60 * 1000);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
        label="Basic example"
        value={value}
        onChange={onChange}
        inputFormat="yyyy-MM-dd"
        maxDate={maxDate}
        maxDateMessage="Date can not be after 14 days later"
        minDate={minDate}
        minDateMessage="Date can not be before 50 years ago"
        disabled={disabled}
        renderInput={(params) => <TextField fullWidth={true} {...params} />}
      />
      <ErrorContainer error={errorMessage} />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
