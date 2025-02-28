import React from "react";

interface Props {
  children: string;
  color?: string;
  background?: string;
  extraContent?: React.ReactNode;
  extraContent_Right?: React.ReactNode;
  onClick?: () => void;
  px?: string;
  py?: string;
}

const PrimaryBtn = ({
  children,
  color,
  background,
  extraContent,
  extraContent_Right,
  onClick,
  px = "px-4 md:px-6 lg:px-8",
  py = "py-2 md:py-3 lg:py-3",
}: Props) => {
  return (
    <button
      className={`flex items-center font-medium text-sm md:text-base lg:text-lg ${py} ${px} rounded-lg shadow-md transition ease-out duration-300 cursor-pointer border-3 hover:opacity-50 hover:shadow-lg`}
      style={
        {
          color: color || "#ffffff",
          backgroundColor: background || "#2D9CDB",
          borderColor: background || "#2D9CDB",
        } as React.CSSProperties
      }
      onClick={onClick}
    >
      {extraContent && <span className="ml-2">{extraContent}</span>}
      {children}
      {extraContent_Right && <span className="ml-2">{extraContent_Right}</span>}
    </button>
  );
};

export default PrimaryBtn;
