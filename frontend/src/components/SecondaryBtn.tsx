import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  color?: string;
  borderColor?: string;
  extraContent?: React.ReactNode;
  extraContent_Right?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  px?: string;
  py?: string;
  style?: string;
}

const SecondaryBtn = ({
  children,
  color,
  borderColor,
  extraContent,
  extraContent_Right,
  onClick,
  style,
  type = "button",
  px = "px-4 md:px-6 lg:px-8",
  py = "py-2 md:py-3 lg:py-3",
}: Props) => {
  return (
    <button
      type={type}
      className={`flex items-center font-medium text-sm md:text-base lg:text-lg ${px} ${py} ${style} rounded-lg shadow-md transition ease-out duration-300 cursor-pointer border-3 hover:opacity-50 hover:shadow-lg`}
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
