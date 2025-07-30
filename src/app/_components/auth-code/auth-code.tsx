import React, { useRef } from "react";
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

  const sendResult = () => {};
  const handleOnChange = () => {};
  const handleOnFocus = () => {};
  const handleOnKeyDown = () => {};

  const inputs = [];

  const classes=classNames('textbox flex-1 w-1 text-center',{
    [`textbox-${variant}`]: variant,
  })
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
  return (
    <div className="flex gap-4 flex-row-reverse">
        {inputs}
    </div>
  );
};
