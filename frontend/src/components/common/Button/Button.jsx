import React from "react";
import { Link } from "react-router-dom";
import "./button.css";

const Button = ({ children, onClick, to, className }) => {
  const classes = `custom-button ${className || ""}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
