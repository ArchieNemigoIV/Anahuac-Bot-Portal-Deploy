import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string | ReactNode;
  text: string;
  variant?: "primary" | "secondary" | "outline";
}

export default function Button({
  icon,
  text,
  variant = "primary",
  className,
  ...rest
}: ButtonProps) {
  const renderIcon = () => {
    if (typeof icon === "string") {
      return <img src={icon} alt={`${text} icon`} className="w-5 h-5" />;
    }
    return <span className="w-5 h-5">{icon}</span>;
  };

  const variants = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40",
    secondary: "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 shadow-lg",
    outline: "border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-orange-500 hover:text-orange-500"
  };

  return (
    <button
      {...rest}
      className={`w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-medium transition-all duration-300 transform active:scale-[0.98] ${variants[variant]} ${className ?? ""}`}
    >
      {icon && renderIcon()}
      <span>{text}</span>
    </button>
  );
}
