'use client';
import { LucideIcon } from "lucide-react";
import { cn } from "@erecruitment/ui";

export const ItemLabel = ({ label, value, Icon, labelClass, valueClass, className }: ItemLabelProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-1">
        {Icon && <Icon size={20} className="text-gray-500" />}
        <span className={cn(" text-gray-500 font-normal", labelClass)}>{label}:</span>
      </div>
      <span className={cn("text-gray-700 font-semibold", valueClass)}>{value}</span>
    </div>
  );
};

type ItemLabelProps = { label: string; value: string; Icon?: LucideIcon, labelClass?: string, valueClass?: string, className?: string };
