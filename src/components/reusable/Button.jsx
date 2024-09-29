import React from "react";

const ReusableButton = ({
  outlined = false,
  icon = null,
  children,
  ...props
}) => {
  const buttonClasses = `
    ${
      outlined
        ? "bg-transparent border border-custom-blue text-custom-blue"
        : "bg-custom-blue text-white"
    }
    py-2 px-4 rounded-lg flex items-center transition-all
    hover:bg-custom-blue hover:text-white hover:border-custom-blue
    focus:outline-none focus:ring-2 focus:ring-custom-blue
  `;

  return (
    <button className={buttonClasses} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default ReusableButton;
