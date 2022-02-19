import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useState } from "react";
import styled from "styled-components";
import { DatePicker } from "@material-ui/pickers";
import { formatDate } from "../../utilities";
import ErrorContainer from "../error-container/error-container.component";

const StyledDatePicker = styled(DatePicker)`
  color: white !important;
`;

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
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <StyledDatePicker
        label="Basic example"
        value={value}
        onChange={onChange}
        format="yyyy-MM-dd"
        maxDate={maxDate}
        maxDateMessage="Date can not be after 14 days later"
        minDate={minDate}
        minDateMessage="Date can not be before 50 years ago"
        disabled={disabled}
      />
      <ErrorContainer error={errorMessage} />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerComponent;
