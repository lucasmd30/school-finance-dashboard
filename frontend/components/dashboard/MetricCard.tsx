"use client";

import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { t, theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: string; isPositive: boolean };
  description?: string;
  variant?: "default" | "success" | "warning" | "destructive";
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
  variant = "default",
}: MetricCardProps) {
  const variantStyles = {
    default: cn("border-l-4", theme["border-primary"]),
    success: cn("border-l-4", theme["border-success"]),
    warning: cn("border-l-4", theme["border-warning"]),
    destructive: cn("border-l-4", theme["border-destructive"]),
  };

  const iconVariantStyles = {
    default: theme["icon-primary"],
    success: theme["icon-success"],
    warning: theme["icon-warning"],
    destructive: theme["icon-destructive"],
  };

  return (
    <Card
      className={cn(
        "p-6",
        variantStyles[variant],
        "hover:shadow-lg transition-all duration-300"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className={cn("text-sm font-medium", t("text-muted"))}>{title}</p>

          <div className="flex items-baseline gap-2">
            <p className={cn("text-3xl font-bold", t("text-card"))}>{value}</p>

            {trend && (
              <span
                className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? t("text-success") : t("text-destructive")
                )}
              >
                {trend.value}
              </span>
            )}
          </div>

          {description && (
            <p className={cn("text-xs", t("text-muted"))}>{description}</p>
          )}
        </div>

        <div className={cn("p-3 rounded-xl", iconVariantStyles[variant])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}
