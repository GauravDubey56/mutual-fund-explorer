// search bar component in ANTD

import React from "react";

import { Input } from "antd";

const CustomSearchBar = ({
  placeholder,
  onChange,
  onSubmit,
  style,
  onClear,
  value
}) => {
  return (
    <Input.Search
      placeholder={placeholder}
      onChange={onChange}
      onSearch={onSubmit}
      value={value}
      style={style}
      onClear={onClear}
      allowClear={true}
    />
  );
};

export default CustomSearchBar;
