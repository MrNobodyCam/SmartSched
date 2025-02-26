import React from "react";

interface Props {
  children?: string;
  color?: string;
  borderColor?: string;
  extraContent?: React.ReactNode;
  onClick?: () => void;
}

const SecondaryBtn = ({ children, color, borderColor, extraContent, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center font-medium text-sm md:text-base lg:text-lg py-2 md:py-3 lg:py-3 px-4 md:px-6 lg:px-8 rounded-[12px] shadow-md transition ease-out duration-300 cursor-pointer border-3 hover:opacity-50 hover:shadow-lg"
      style={
        {
          color: color || "#27AE60",
          borderColor: borderColor || "#27AE60",
        } as React.CSSProperties
      }
    >
      {extraContent && <span className="mr-2">{extraContent}</span>}
      <span>{children}</span>
    </button>
  );
};

export default SecondaryBtn;
