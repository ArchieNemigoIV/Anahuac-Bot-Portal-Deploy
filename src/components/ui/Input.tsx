import type { InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
}

export default function Input({
  label,
  error,
  className,
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 mb-4">
      {label && (
        <label
          htmlFor={rest.id || rest.name}
          className="font-medium text-sm text-gray-700 dark:text-gray-300 ml-1"
        >
          {label}
        </label>
      )}
      <input
        {...rest}
        className={`w-full h-12 bg-white dark:bg-gray-900 border rounded-xl px-4 py-2 transition-all duration-200 focus:outline-none focus:ring-4 ${error
            ? "border-red-500 focus:ring-red-500/20"
            : "border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-orange-500/20"
          } ${className ?? ""}`}
      />
      {error && (
        <span className="text-xs text-red-500 ml-1 animate-[fadeIn_0.3s_ease-out]">
          {error.message}
        </span>
      )}
    </div>
  );
}
