import React from "react";

interface Props {
  children?: string;
  color?: string;
  borderColor?: string;
  extraContent?: React.ReactNode;
  extraContent_Right?: React.ReactNode;
  onClick?: () => void;
  px?: string;
  py?: string;
}

const SecondaryBtn = ({
  children,
  color,
  borderColor,
  extraContent,
  extraContent_Right,
  onClick,
  px = "px-4 md:px-6 lg:px-8",
  py = "py-2 md:py-3 lg:py-3",
}: Props) => {
  return (
    <button
      className={`flex items-center font-medium text-sm md:text-base lg:text-lg ${px} ${py} rounded-lg shadow-md transition ease-out duration-300 cursor-pointer border-3 hover:opacity-50 hover:shadow-lg`}
      style={
        {
          color: color || "#27AE60",
          borderColor: borderColor || "#27AE60",
        } as React.CSSProperties
      }
      onClick={onClick}
    >
      {extraContent && <span className="mr-2">{extraContent}</span>}
      {children}
      {extraContent_Right && <span className="ml-2">{extraContent_Right}</span>}
    </button>
  );
};

export default SecondaryBtn;
