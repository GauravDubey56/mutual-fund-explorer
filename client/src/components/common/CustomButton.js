import React from "react";
import { Button } from "antd";

const CustomTextButton = ({ text, type, onClick }) => {
  const handleClick = () => {
    if (onClick && typeof onClick === "function") {
      onClick();
    } else {
      console.error("Handler not linked to button");
    }
  };
  return (
    <Button type={type || "primary"} onClick={handleClick}>
      {text}
    </Button>
  );
};
export default CustomTextButton;
