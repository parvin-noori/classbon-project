import { ComponentBase } from "../types/component-base.type";

export type AuthCodeProps = Omit<ComponentBase,"size"> & {
  length?: number;
  autoFocus?: boolean;
  onChange: (value: string) => void;
};

export type AuthInputProps = {
  max?: string;
  min?: string;
  pattern: string;
};
