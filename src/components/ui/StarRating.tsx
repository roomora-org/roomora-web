import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  error?: boolean;
}

const sizeMap = {
  sm: "h-5 w-5",
  md: "h-7 w-7",
  lg: "h-9 w-9",
};

export function StarRating({
  value,
  onChange,
  max = 5,
  readOnly = false,
  size = "md",
  error = false,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const displayValue = hovered ?? value;

  const handleClick = (rating: number) => {
    if (readOnly || !onChange) return;
    onChange(rating);
  };

  return (
    <div
      className="flex items-center gap-1"
      onMouseLeave={() => setHovered(null)}
      role="radiogroup"
      aria-label="Star rating"
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= displayValue;

        return (
          <button
            key={starValue}
            type="button"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => !readOnly && setHovered(starValue)}
            disabled={readOnly}
            aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
            aria-checked={value === starValue}
            role="radio"
            className={cn(
              "transition-all duration-150 flex items-center justify-center",
              !readOnly && "cursor-pointer hover:scale-110 active:scale-95",
              readOnly && "cursor-default"
            )}
          >
            <Star
              className={cn(
                sizeMap[size],
                "transition-colors",
                isFilled
                  ? error
                    ? "fill-danger-500 text-danger-500"
                    : "fill-accent-500 text-accent-500"
                  : "fill-transparent text-fg-muted/40",
                !readOnly && !isFilled && "hover:text-accent-400"
              )}
              strokeWidth={1.5}
            />
          </button>
        );
      })}

      {/* Label: "1 star", "2 stars", etc. */}
      {!readOnly && (
        <span className="ml-2 text-sm font-medium text-fg-muted tabular-nums">
          {displayValue} {displayValue === 1 ? "star" : "stars"}
        </span>
      )}
    </div>
  );
}