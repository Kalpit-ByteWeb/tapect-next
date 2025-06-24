import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
  className,
  type,
  disabled,
  style,
}) => {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type={type}
      className={className}
      disabled={disabled}
      style={style}>
      {children}
    </button>
  );
};

export default Button;
