import React from "react";

interface Props {
  children: string;
  color?: string;
  background?: string;
  extraContent?: React.ReactNode;
  extraContent_Right?: React.ReactNode;
  style?: string;
  onClick?: () => void;
  px?: string;
  py?: string;
  type?: "button" | "submit" | "reset";
}

const PrimaryBtn = ({
  children,
  style,
  color,
  background,
  extraContent,
  extraContent_Right,
  onClick,
  type = "button",
  px = "px-4 md:px-6 lg:px-8",
  py = "py-2 md:py-3 lg:py-3",
}: Props) => {
  return (
    <button
      type={type}
      className={`flex items-center font-medium text-sm md:text-base lg:text-lg ${style} ${py} ${px} rounded-lg shadow-md transition ease-out duration-300 cursor-pointer border-3 hover:opacity-50 hover:shadow-lg`}
      style={
        {
          color: color || "#ffffff",
          backgroundColor: background || "#2D9CDB",
          borderColor: background || "#2D9CDB",
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

export default PrimaryBtn;
