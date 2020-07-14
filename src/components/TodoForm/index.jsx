import React, { useState } from "react";
import PropTypes from "prop-types";

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
  onSubmit: null,
};

function TodoForm(props) {
  const { onSubmit } = props;
  const [value, setValue] = useState("");

  function handleOnValueChange(e) {
    console.log(e.target.value);

    setValue(e.target.value);
  }

  function handleOnSubmit(e) {
    // Prevent reloading browser
    e.preventDefault();

    if (!onSubmit) return;

    const formValue = {
      title: value,
    };

    onSubmit(formValue);

    // Reset Form
    setValue("");
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <input type="text" value={value} onChange={handleOnValueChange} />
    </form>
  );
}

export default TodoForm;
