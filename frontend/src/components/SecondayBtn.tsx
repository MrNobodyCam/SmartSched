import React from "react";

interface Props {
  children?: string;
  color?: string;
  border?: string;
  extraContent?: React.ReactNode;
}

const SecondaryBtn = ({ children, color, border, extraContent }: Props) => {
  return (
    <button
      className="flex items-centerfont-medium text-sm md:text-base lg:text-lg py-2 md:py-3 lg:py-3 px-4 md:px-6 lg:px-8 rounded-lg shadow-md transition ease-out duration-300 cursor-pointer border-3 hover:opacity-50 hover:shadow-lg"
      style={
        {
          color: color || "#27AE60",
          borderColor: border || "#27AE60",
        } as React.CSSProperties
      }
    >
      {children}
      {extraContent && <span className="ml-2">{extraContent}</span>}
    </button>
  );
};

export default SecondaryBtn;
