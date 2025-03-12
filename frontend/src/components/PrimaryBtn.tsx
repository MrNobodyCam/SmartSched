import React, { CSSProperties } from "react";

interface PrimaryBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  py?: string;
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
  children,
  onClick,
  py = "py-2",
  type = "submit",
  style,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      className={`${py} px-4 bg-[#2D9CDB] text-white rounded-md text-[16px] md:text-[18px] lg:text-[20px]`}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
