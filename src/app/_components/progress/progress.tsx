import React from "react";
import { ProgressProps } from "./progress.types";
import classNames from "classnames";
import { Size } from "../types/size.type";

const sizeClasses: Record<Size, string> = {
  tiny: "progress-xs",
  small: "progress-sm",
  normal: "progress-md",
  large: "progress-lg",
};

export const Progress: React.FC<ProgressProps> = ({
  value,
  className,
  variant = "neutral",
  size = "small",
}) => {
  const classes = classNames("progress", className, {
    [`progress-${variant}`]: variant,
    [`${sizeClasses[size]}`]: size,
  });
  return <progress max="100" value={value} className={classes} />;
};
