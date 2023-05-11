import React from "react";

interface HeroButtonProps {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
}

const HeroButton: React.FC<HeroButtonProps> = ({
  active,
  onClick,
  title,
  subtitle,
}) => {
  return (
    <button
      className={`appearance-none w-40 px-3 pb-2 pt-1 border-4 border-transparent text-left ${
        active ? "border-rose-600 bg-rose-600 rounded-2xl text-white" : ""
      }`}
      onClick={onClick}
    >
      <p className="font-bold text-2xl">{title}</p>
      <p>{subtitle}</p>
    </button>
  );
};

export default HeroButton;
