import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

PostFilterForm.propTypes = {
  onSubmit: PropTypes.func,
};

PostFilterForm.defauleProps = {
  onSubmit: null,
};

function PostFilterForm(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef;

  function handleSearchTermChange(e) {
    e.preventDefault();
    const value = e.target.value;

    setSearchTerm(value);
    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };

      onSubmit(formValues);
    }, 300);
  }

  return (
    <form>
      <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
    </form>
  );
}

export default PostFilterForm;
