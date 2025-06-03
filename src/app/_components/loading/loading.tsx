"use client";
import React from "react";
import { Size } from "../types/size.type";
import classNames from "classnames";
import { loadingProps } from "./loading.type";

const sizeClasses: Record<Size, string> = {
  tiny: "loading-xs",
  small: "loading-sm",
  normal: "loading-md",
  large: "loading-lg",
};

export const Loading: React.FC<loadingProps> = ({
  type = "spinner",
  variant,
  size = "normal",
  className,
}) => {

  const classes = classNames(
    "loading",
    className,
    { [`${sizeClasses[size]}`]: size },
    { [`loading-${variant}`]: variant },
    { [`loading-${type}`]: type}
);
  return <span className={classes}></span>;
};