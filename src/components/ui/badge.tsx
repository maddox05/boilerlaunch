import * as React from "react";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const variantMap = {
  default: "border-transparent bg-black text-white",
  secondary: "border-transparent bg-gray-100 text-gray-900",
  destructive: "border-transparent bg-red-600 text-white",
  outline: "text-current border current",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        variantMap[variant],
        className
      )}
      {...props}
    />
  );
}

export default Badge;
