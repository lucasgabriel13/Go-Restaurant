import {
  useEffect,
  useRef,
  useState,
  useCallback,
  InputHTMLAttributes,
  JSXElementConstructor,
} from "react";

import { useField } from "@unform/core";

import { Container } from "./styles";
import { IconBaseProps } from "react-icons";

type Icon = JSXElementConstructor<IconBaseProps> & {
  size: number;
};

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  icon?: Icon;
};

const Input = ({ name, icon: Icon, ...rest }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export default Input;
