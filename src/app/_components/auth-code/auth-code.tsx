import React, { useEffect, useRef } from "react";
import { AuthCodeProps, AuthInputProps } from "./auth-code.types";
import classNames from "classnames";

export const AuthCode: React.FC<AuthCodeProps> = ({
  variant = "ghost",
  className,
  length = 5,
  isDisabled,
  autoFocus = true,
  onChange,
}) => {
  if (length < 1) {
    throw new Error("تعداد ارقام باید بزرگتر از صفر باشد");
  }

  const inputRef = useRef<Array<HTMLInputElement>>([]);

  const inputProps: AuthInputProps = {
    min: "0",
    max: "9",
    pattern: "[0-9]{1}",
  };

  useEffect(() => {
    if (autoFocus) {
      inputRef.current[0].focus();
    }
  }, [autoFocus]);

  const sendResult = () => {
    const result = inputRef.current.map((input) => input.value).join("");
    onChange(result);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, nextElementSibling },
    } = e;

    if (value.match(inputProps.pattern)) {
      if (nextElementSibling !== null) {
        (nextElementSibling as HTMLInputElement).focus();
      }
    } else {
      e.target.value = "";
    }

    sendResult();
  };
  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    if (key === "Backspace") {
      if (target.value === "") {
        if (target.previousElementSibling !== null) {
          const previous = target.previousElementSibling as HTMLInputElement;
          previous.value = "";
          previous.focus();
        }
      } else {
        target.value = "";
      }
    }

    sendResult();
  };

  const inputs = [];

  const classes = classNames("textbox flex-1 w-1 text-center", {
    [`textbox-${variant}`]: variant,
  });
  for (let i = 0; i < length; i++) {
    inputs.push(
      <input
        type="text"
        disabled={isDisabled}
        className={classes}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onKeyDown={handleOnKeyDown}
        ref={(element: HTMLInputElement) => {
          inputRef.current[i] = element;
        }}
      />
    );
  }
  return <div className="flex gap-4 flex-row-reverse">{inputs}</div>;
};
